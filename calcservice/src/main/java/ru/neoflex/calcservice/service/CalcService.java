package ru.neoflex.calcservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.dto.response.PaymentScheduleElementDto;
import ru.neoflex.calcservice.exception.BusinessValidationException;
import ru.neoflex.calcservice.properties.CalcProperties;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

@Slf4j
@Service
public class CalcService {

    private final CalcProperties properties;
    private final MathContext mc = new MathContext(8, RoundingMode.HALF_UP);

    public CalcService(CalcProperties properties) {
        this.properties = properties;
    }

    public List<LoanOfferDto> prescore(LoanStatementRequestDto request) {
        validateAge(request.getBirthdate(), request.getTerm());
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

    public CreditDto calc(ScoringDataDto request) {
        Integer term = request.getTerm();

        validateAge(request.getBirthdate(), term);

        BigDecimal amount = request.getAmount();
        Boolean isInsuranceEnabled = request.getIsInsuranceEnabled();
        Boolean isSalaryClient = request.getIsSalaryClient();
        BigDecimal psk = calculateAmount(isInsuranceEnabled, amount, term);
        log.debug("Credit psk: {}",
                psk);
        BigDecimal rate = calculateRate(isInsuranceEnabled, isSalaryClient, amount, term);
        log.debug("Credit rate: {}",
                rate);
        BigDecimal monthlyPayment = calculateMonthlyPayment(rate, term, psk);
        log.debug("Credit monthlyPayment: {}",
                monthlyPayment);
        List<PaymentScheduleElementDto> paymentSchedule = calculatePaymentSchedule(monthlyPayment, term, psk, rate);

        return CreditDto.builder()
                .amount(amount)
                .term(term)
                .monthlyPayment(monthlyPayment)
                .rate(rate)
                .psk(psk)
                .isInsuranceEnabled(isInsuranceEnabled)
                .isSalaryClient(isSalaryClient)
                .paymentSchedule(paymentSchedule)
                .build();
    }

    private LoanOfferDto createOffer(LoanStatementRequestDto request, Boolean isInsuranceEnabled, Boolean isSalaryClient) {
        BigDecimal requestAmount = request.getAmount();
        Integer term = request.getTerm();
        UUID statementId = UUID.randomUUID();
        BigDecimal totalAmount = calculateAmount(isInsuranceEnabled, requestAmount, term);
        log.debug("loanOffer {} totalAmount: {}, isInsuranceEnabled: {}, isSalaryClient: {}",
                statementId, totalAmount, isInsuranceEnabled, isSalaryClient);
        BigDecimal rate = calculateRate(isInsuranceEnabled, isSalaryClient, requestAmount, term);
        log.debug("loanOffer {} rate: {}, isInsuranceEnabled: {}, isSalaryClient: {}",
                statementId, rate, isInsuranceEnabled, isSalaryClient);
        BigDecimal monthlyPayment = calculateMonthlyPayment(rate, term, totalAmount);
        log.debug("loanOffer {} monthlyPayment: {}, isInsuranceEnabled: {}, isSalaryClient: {}",
                statementId, monthlyPayment, isInsuranceEnabled, isSalaryClient);

        return LoanOfferDto.builder()
                .statementId(statementId)
                .requestedAmount(requestAmount.setScale(0, RoundingMode.HALF_UP))
                .totalAmount(totalAmount.setScale(0, RoundingMode.HALF_UP))
                .term(term)
                .monthlyPayment(monthlyPayment)
                .rate(rate.setScale(3, RoundingMode.HALF_UP))
                .isInsuranceEnabled(isInsuranceEnabled)
                .isSalaryClient(isSalaryClient).build();
    }

    private List<PaymentScheduleElementDto> calculatePaymentSchedule(BigDecimal monthlyPayment, Integer term, BigDecimal amount, BigDecimal rate) {
        List<PaymentScheduleElementDto> paymentSchedule = new ArrayList<>(term);
        BigDecimal monthlyRate = calculateMonthlyRate(rate);

        LocalDate paymentDate = LocalDate.now().plusMonths(1);
        BigDecimal remainingDebt = amount;
        for (int month = 1; month <= term; month++) {
            BigDecimal interestPayment = remainingDebt.multiply(monthlyRate);
            log.debug("PaymentScheduleElement {} interestPayment: {}",
                    month, interestPayment);
            BigDecimal debtPayment;
            BigDecimal totalPayment;

            if (month == term) {
                debtPayment = remainingDebt;
                totalPayment = interestPayment.add(debtPayment);
            } else {
                debtPayment = monthlyPayment.subtract(interestPayment);
                totalPayment = monthlyPayment;
            }
            if (remainingDebt.compareTo(BigDecimal.ZERO) < 0) {
                debtPayment = BigDecimal.ZERO;
                totalPayment = interestPayment;
            }
            log.debug("PaymentScheduleElement {} debtPayment: {}",
                    month, debtPayment);
            log.debug("PaymentScheduleElement {} totalPayment: {}",
                    month, totalPayment);
            remainingDebt = remainingDebt.subtract(debtPayment);
            if (remainingDebt.compareTo(BigDecimal.ZERO) < 0) {
                remainingDebt = BigDecimal.ZERO;
            }
            log.debug("PaymentScheduleElement {} remainingDebt: {}",
                    month, remainingDebt);

            PaymentScheduleElementDto element = PaymentScheduleElementDto.builder()
                    .number(month)
                    .date(paymentDate)
                    .totalPayment(totalPayment.setScale(2, RoundingMode.HALF_UP))
                    .interestPayment(interestPayment.setScale(2, RoundingMode.HALF_UP))
                    .debtPayment(debtPayment.setScale(2, RoundingMode.HALF_UP))
                    .remainingDebt(remainingDebt.setScale(2, RoundingMode.HALF_UP))
                    .build();

            paymentDate = paymentDate.plusMonths(1);
            paymentSchedule.add(element);
        }
        return paymentSchedule;
    }

    private BigDecimal calculateRate(Boolean isInsuranceEnabled, Boolean isSalaryClient, BigDecimal requestAmount, Integer term) {
        BigDecimal insuranceDiscount = new BigDecimal(0);
        BigDecimal salaryClientDiscount = new BigDecimal(0);
        if (isInsuranceEnabled) {
            if (requestAmount.compareTo(new BigDecimal(500000)) < 0) {
                insuranceDiscount = properties.getInsurancePercentDiscount();
            } else {
                insuranceDiscount = calculateInsuranceDiscount(term, requestAmount);
            }
        }
        if (isSalaryClient) {
            salaryClientDiscount = properties.getSalaryClientDiscount();
        }
        BigDecimal rate = properties.getBaseRate().subtract(insuranceDiscount).subtract(salaryClientDiscount);
        if (rate.compareTo(properties.getMinRate()) < 0) {
            rate = properties.getMinRate();
        }

        return rate;
    }

    // Расчет полной цены кредита
    private BigDecimal calculateAmount(Boolean isInsuranceEnabled, BigDecimal requestedAmount, Integer term) {
        BigDecimal totalAmount = requestedAmount;
        if (isInsuranceEnabled) {
            BigDecimal termInYears = BigDecimal.valueOf(term).divide(new BigDecimal(12), mc);
            BigDecimal insuranceCost;
            if (requestedAmount.compareTo(properties.getSmallCreditLimit()) < 0) {
                insuranceCost = requestedAmount.multiply(properties.getInsuranceCostMultiplier()).multiply(termInYears);
            } else {
                insuranceCost = properties.getInsurancePacketCost().multiply(termInYears);
            }
            totalAmount = requestedAmount.add(insuranceCost);
        }
        return totalAmount;
    }

    private BigDecimal calculateMonthlyPayment(BigDecimal rate, Integer term, BigDecimal amount) {
        BigDecimal monthlyRate = calculateMonthlyRate(rate);
        // (1 + monthlyRate)**term
        BigDecimal termRateCoeff = (monthlyRate.add(new BigDecimal(1))).pow(term);
        // i * (1 + monthlyRate)**term / (1 + monthlyRate)**2 - 1
        BigDecimal paymentCoeff = monthlyRate.multiply(termRateCoeff).divide(termRateCoeff.subtract(new BigDecimal(1)), mc);

        return amount.multiply(paymentCoeff).setScale(0, RoundingMode.HALF_UP);
    }

    // Расчет скидки при пакетной страховки
    private BigDecimal calculateInsuranceDiscount(Integer term, BigDecimal amount) {
        BigDecimal termInYears = BigDecimal.valueOf(term).divide(new BigDecimal(12), mc);
        BigDecimal insuranceCost = properties.getInsurancePacketCost().multiply(termInYears);
        BigDecimal bankInsuranceEarning = properties.getCommissionRate().multiply(insuranceCost);

        // discount = ((insuranceEarning) / amount) * (1 / termInYears)
        BigDecimal discount = (bankInsuranceEarning.divide(
                amount, mc)).multiply(new BigDecimal(1).divide(termInYears, mc));
        if (discount.compareTo(BigDecimal.ZERO) < 0) {
            return new BigDecimal(0);
        }

        return discount;
    }

    private BigDecimal calculateMonthlyRate(BigDecimal rate) {
        return rate.divide(new BigDecimal(12), mc);
    }

    private int calculateAge(LocalDate birthdate) {
        return Period.between(birthdate, LocalDate.now()).getYears();

    }
    // Бизнес-валидация (прескоринг)
    private void validateAge(LocalDate birthdate, Integer term) {
        if (calculateAge(birthdate) < 18) {
            throw new BusinessValidationException("birthdate: Клиент должен быть старше 18 лет");
        }
        int ageAtCreditEnd = calculateAge(birthdate) + term / 12;
        if (ageAtCreditEnd > 65) {
            throw new BusinessValidationException("birthdate: Возраст клиента на момент окончания кредита не может быть больше 65 лет");
        }
    }
}
