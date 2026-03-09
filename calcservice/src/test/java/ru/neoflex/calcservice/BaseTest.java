package ru.neoflex.calcservice;

import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.dto.response.PaymentScheduleElementDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

public abstract class BaseTest {

    protected static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    protected static LoanStatementRequestDto createDefaultLoanStatementRequestDto() {
        return LoanStatementRequestDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(36)
                .firstName("Илья")
                .lastName("Семенов")
                .middleName("Игоревич")
                .email("bivansir@gmail.com")
                .birthdate(LocalDate.parse("25-08-2004", formatter))
                .passportSeries("3232")
                .passportNumber("123123")
                .build();
    }

    protected static ScoringDataDto createScoringDataDto() {
        return ScoringDataDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(36)
                .firstName("Илья")
                .lastName("Семенов")
                .middleName("Игоревич")
                .birthdate(LocalDate.parse("25-08-2004", formatter))
                .passportSeries("3232")
                .passportNumber("123123")
                .isInsuranceEnabled(false)
                .isSalaryClient(false)
                .build();
    }

    protected static LoanOfferDto createDefaultLoanOfferDto() {
        return LoanOfferDto.builder()
                .statementId(UUID.randomUUID())
                .requestedAmount(BigDecimal.valueOf(1000000))
                .totalAmount(BigDecimal.valueOf(1000000))
                .term(36)
                .monthlyPayment(BigDecimal.valueOf(12000))
                .rate(BigDecimal.valueOf(0.25))
                .isInsuranceEnabled(false)
                .isInsuranceEnabled(false)
                .build();
    }

    protected static CreditDto createDefaultCreditDto() {
        List<PaymentScheduleElementDto> paymentSchedule = List.of(
                PaymentScheduleElementDto.builder()
                        .number(1)
                        .date(LocalDate.parse("25-08-2004", formatter))
                        .totalPayment(BigDecimal.valueOf(12000))
                        .interestPayment(BigDecimal.valueOf(12000))
                        .debtPayment(BigDecimal.valueOf(12000))
                        .remainingDebt(BigDecimal.valueOf(12000))
                        .build()
                );

        return CreditDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(6)
                .monthlyPayment(BigDecimal.valueOf(12000))
                .rate(BigDecimal.valueOf(0.25))
                .psk(BigDecimal.valueOf(120000))
                .isInsuranceEnabled(false)
                .isInsuranceEnabled(false)
                .paymentSchedule(paymentSchedule)
                .build();
    }
}
