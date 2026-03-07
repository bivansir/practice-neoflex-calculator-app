package ru.neoflex.calcservice.service;

import org.springframework.stereotype.Service;
import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Service
public class CalcService {

    private final CalcProperties properties;
    private final MathContext mc = new MathContext(8, RoundingMode.HALF_UP);

    public CalcService(CalcProperties properties) {
        this.properties = properties;
    }

    private int calculateAge(LocalDate birthdate) {
        return Period.between(birthdate, LocalDate.now()).getYears();

    }

    private void validate(LoanStatementRequestDto request) {
        if (calculateAge(request.getBirthdate()) < 18) {
            throw new BusinessValidationException("Клиент должен быть старше 18 лет");
        }
        int ageAtCreditEnd = calculateAge(request.getBirthdate()) + request.getTerm() / 12;
        if (ageAtCreditEnd > 65) {
            throw new BusinessValidationException("Возраст клиента на момент окончания кредита не может быть больше 65 лет");
        }
    }


    private BigDecimal calculateMonthlyPayment(BigDecimal rate, Integer term, BigDecimal amount) {
        BigDecimal monthlyRate = rate.divide(new BigDecimal(12), mc);
        // (1 + monthlyRate)**term
        BigDecimal termRateCoeff = (monthlyRate.add(new BigDecimal(1))).pow(term);
        // i * (1 + monthlyRate)**term / (1 + monthlyRate)**2 - 1
        BigDecimal paymentCoeff = monthlyRate.multiply(termRateCoeff).divide(termRateCoeff.subtract(new BigDecimal(1)), mc);

        return amount.multiply(paymentCoeff).setScale(0, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateInsuranceDiscount(Integer term, BigDecimal amount, BigDecimal insuranceCost) {
        BigDecimal termInYears = BigDecimal.valueOf(term).divide(new BigDecimal(12), mc);
        BigDecimal bankInsuranceEarning = properties.getCommissionRate().multiply(insuranceCost);

        // discount = ((insuranceEarning) / amount) * (1 / termInYears)
        BigDecimal discount = (bankInsuranceEarning.divide(
                amount, mc)).multiply(new BigDecimal(1).divide(termInYears, mc));
        if (discount.compareTo(BigDecimal.ZERO) < 0) {
            return new BigDecimal(0);
        }

        return discount;
    }

    private LoanOfferDto createOffer(LoanStatementRequestDto request, Boolean isInsuranceEnabled, Boolean isSalaryClient) {
        BigDecimal insuranceDiscount = new BigDecimal(0);
        BigDecimal salaryClientDiscount = new BigDecimal(0);
        BigDecimal requestAmount = request.getAmount();
        BigDecimal totalAmount = requestAmount;
        Integer term = request.getTerm();

        if (isInsuranceEnabled) {
            BigDecimal termInYears = BigDecimal.valueOf(term).divide(new BigDecimal(12), mc);
            BigDecimal insuranceCost;
            if (requestAmount.compareTo(new BigDecimal(500000)) < 0) {
                insuranceDiscount = properties.getInsurancePercentDiscount();
                insuranceCost = requestAmount.multiply(properties.getInsuranceCostMultiplier()).multiply(termInYears);
            } else {
                insuranceCost = properties.getInsurancePacketCost().multiply(termInYears);
                insuranceDiscount = calculateInsuranceDiscount(term, requestAmount, insuranceCost);
            }
            totalAmount = requestAmount.add(insuranceCost).setScale(0, RoundingMode.HALF_UP);
        }
        if (isSalaryClient) {
            salaryClientDiscount = properties.getSalaryClientDiscount();
        }
        BigDecimal rate = properties.getBaseRate().subtract(insuranceDiscount).subtract(salaryClientDiscount).setScale(3, RoundingMode.HALF_UP);
        if (rate.compareTo(properties.getMinRate()) < 0) {
            rate = properties.getMinRate();
        }
        BigDecimal monthlyPayment = calculateMonthlyPayment(rate, term, totalAmount);

        return LoanOfferDto.builder()
                .statementId(UUID.randomUUID())
                .requestedAmount(requestAmount)
                .totalAmount(totalAmount)
                .term(term)
                .monthlyPayment(monthlyPayment)
                .rate(rate)
                .isInsuranceEnabled(isInsuranceEnabled)
                .isSalaryClient(isSalaryClient).build();
    }

    public List<LoanOfferDto> prescore(LoanStatementRequestDto request) {
        validate(request);
        List<LoanOfferDto> offers = new ArrayList<>();

        for (boolean isInsuranceEnabled : Arrays.asList(false, true)) {
            for (boolean isSalaryClient : Arrays.asList(false, true)) {
                LoanOfferDto offer = createOffer(request, isInsuranceEnabled, isSalaryClient);
                offers.add(offer);
            }
        }

        offers.sort(Comparator
                .comparing(LoanOfferDto::getRate) // по ставке (меньше = лучше)
                .thenComparing(
                        offer -> offer.getTotalAmount().subtract(offer.getRequestedAmount()),
                        Comparator.reverseOrder() // по разнице (больше = хуже)
                )
        );

        return offers;
    }
}
