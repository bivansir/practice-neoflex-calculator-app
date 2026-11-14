package ru.neoflex.deal.service.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.dto.PaymentScheduleElementDto;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.repository.CreditRepository;
import ru.neoflex.deal.service.CreditService;
import ru.neoflex.deal.util.IntegrationTestBase;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DirtiesContext(
        classMode = DirtiesContext.ClassMode.AFTER_CLASS
)
class CreditServiceIntegrationTest extends IntegrationTestBase {

    @Autowired
    private CreditService creditService;

    @Autowired
    private CreditRepository creditRepository;

    @Test
    void shouldSaveCreditToDatabase() {
        // given
        CreditDto request = CreditDto.builder()
                .amount(BigDecimal.valueOf(124))
                .term(123)
                .monthlyPayment(BigDecimal.valueOf(123))
                .rate(BigDecimal.valueOf(123))
                .psk(BigDecimal.valueOf(213))
                .isInsuranceEnabled(true)
                .isSalaryClient(true)
                .paymentSchedule(List.of(PaymentScheduleElementDto.builder()
                        .number(12)
                        .date(LocalDate.now())
                        .totalPayment(BigDecimal.valueOf(213))
                        .interestPayment(BigDecimal.valueOf(123))
                        .debtPayment(BigDecimal.valueOf(123))
                        .remainingDebt(BigDecimal.valueOf(123))
                        .build()))
                .build();

        // when
        Credit saved = creditService.createCredit(request);

        // then
        Credit credit = creditRepository.getReferenceById(saved.getCreditId());
        assertEquals(request.getAmount(), credit.getAmount());
        assertEquals(request.getTerm(), credit.getTerm());
        assertEquals(request.getMonthlyPayment(), credit.getMonthlyPayment());
        assertEquals(request.getRate(), credit.getRate());
        assertEquals(request.getIsInsuranceEnabled(), credit.getIsInsuranceEnabled());
        assertEquals(request.getIsSalaryClient(), credit.getIsSalaryClient());
        assertEquals(request.getPaymentSchedule(), credit.getPaymentSchedule());
    }
}
