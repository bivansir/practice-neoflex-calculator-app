package ru.neoflex.calcservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.TestPropertySource;
import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.dto.response.PaymentScheduleElementDto;
import ru.neoflex.calcservice.service.BusinessValidationException;
import ru.neoflex.calcservice.service.CalcService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestPropertySource(properties = {
        "calculator.insuranceCostMultiplier=0.01",
        "calculator.insurancePacketCost=10000",
        "calculator.commissionRate = 0.4",
        "calculator.baseRate=0.25",
        "calculator.minRate = 0.20",
        "calculator.salaryClientDiscount=0.02",
        "calculator.insurancePercentDiscount=0.01"
})
class CalcServiceTest {

    @Autowired
    private CalcService calcService;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public static LoanStatementRequestDto createDefaultLoanStatementRequestDto() {
        return LoanStatementRequestDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(36)
                .firstName("Илья")
                .lastName("Семёнов")
                .middleName("Игоревич")
                .email("bivansir@gmail.com")
                .birthdate(LocalDate.parse("25-08-2004", formatter))
                .passportSeries("3232")
                .passportNumber("123123")
                .build();
    }

    @Test
    void businessValidationExceptionTest() {
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        request.setBirthdate(LocalDate.parse("25-08-2014", formatter));
        BusinessValidationException underAgeException = assertThrows(
                BusinessValidationException.class,
                () -> calcService.prescore(request)
        );
        assertEquals("Клиент должен быть старше 18 лет", underAgeException.getMessage());

        request.setBirthdate(LocalDate.parse("25-08-1962", formatter));
        BusinessValidationException overAgeException = assertThrows(
                BusinessValidationException.class,
                () -> calcService.prescore(request)
        );
        assertEquals("Возраст клиента на момент окончания кредита не может быть больше 65 лет", overAgeException.getMessage());
    }

    @Test
    void prescoreCalculatingTest() {
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        List<LoanOfferDto> offers = calcService.prescore(request);

        assertEquals(4, offers.size());

        LoanOfferDto withBoth = offers.get(0);
        assertEquals(new BigDecimal("0.226"), withBoth.getRate());
        assertEquals(new BigDecimal(1030000), withBoth.getTotalAmount());
        assertEquals(new BigDecimal(39657), withBoth.getMonthlyPayment());

        LoanOfferDto withSalaryOnly = offers.get(1);
        assertEquals(new BigDecimal("0.230"), withSalaryOnly.getRate());
        assertEquals(new BigDecimal(1000000), withSalaryOnly.getTotalAmount());
        assertEquals(new BigDecimal(38710), withSalaryOnly.getMonthlyPayment());

        LoanOfferDto withInsuranceOnly = offers.get(2);
        assertEquals(new BigDecimal("0.246"), withInsuranceOnly.getRate());
        assertEquals(new BigDecimal(1030000), withInsuranceOnly.getTotalAmount());
        assertEquals(new BigDecimal(40735), withInsuranceOnly.getMonthlyPayment());

        LoanOfferDto withoutDiscounts = offers.get(3);
        assertEquals(new BigDecimal("0.250"), withoutDiscounts.getRate());
        assertEquals(new BigDecimal(1000000), withoutDiscounts.getTotalAmount());
        assertEquals(new BigDecimal(39760), withoutDiscounts.getMonthlyPayment());
    }

    @Test
    void calcCalculatingTest() {
        ScoringDataDto request = ScoringDataDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(6)
                .firstName("Илья")
                .lastName("Семёнов")
                .middleName("Игоревич")
                .birthdate(LocalDate.parse("25-08-2004", formatter))
                .passportSeries("3232")
                .passportNumber("123123")
                .isInsuranceEnabled(false)
                .isSalaryClient(false)
                .build();

        CreditDto credit = calcService.calc(request);
        List<PaymentScheduleElementDto> paymentSchedule = credit.getPaymentSchedule();

        assertEquals(new BigDecimal("179028.00"), paymentSchedule.get(0).getTotalPayment());
        assertEquals(new BigDecimal("20833.33"), paymentSchedule.get(0).getInterestPayment());
        assertEquals(new BigDecimal("158194.67"), paymentSchedule.get(0).getDebtPayment());
        assertEquals(new BigDecimal("841805.33"), paymentSchedule.get(0).getRemainingDebt());

        assertEquals(new BigDecimal("179028.00"), paymentSchedule.get(1).getTotalPayment());
        assertEquals(new BigDecimal("17537.61"), paymentSchedule.get(1).getInterestPayment());
        assertEquals(new BigDecimal("161490.39"), paymentSchedule.get(1).getDebtPayment());
        assertEquals(new BigDecimal("680314.94"), paymentSchedule.get(1).getRemainingDebt());

        assertEquals(new BigDecimal("179028.00"), paymentSchedule.get(2).getTotalPayment());
        assertEquals(new BigDecimal("14173.23"), paymentSchedule.get(2).getInterestPayment());
        assertEquals(new BigDecimal("164854.77"), paymentSchedule.get(2).getDebtPayment());
        assertEquals(new BigDecimal("515460.17"), paymentSchedule.get(2).getRemainingDebt());

        assertEquals(new BigDecimal("179028.00"), paymentSchedule.get(3).getTotalPayment());
        assertEquals(new BigDecimal("10738.75"), paymentSchedule.get(3).getInterestPayment());
        assertEquals(new BigDecimal("168289.25"), paymentSchedule.get(3).getDebtPayment());
        assertEquals(new BigDecimal("347170.92"), paymentSchedule.get(3).getRemainingDebt());

        assertEquals(new BigDecimal("179028.00"), paymentSchedule.get(4).getTotalPayment());
        assertEquals(new BigDecimal("7232.73"), paymentSchedule.get(4).getInterestPayment());
        assertEquals(new BigDecimal("171795.27"), paymentSchedule.get(4).getDebtPayment());
        assertEquals(new BigDecimal("175375.65"), paymentSchedule.get(4).getRemainingDebt());

        assertEquals(new BigDecimal("179029.31"), paymentSchedule.get(5).getTotalPayment());
        assertEquals(new BigDecimal("3653.66"), paymentSchedule.get(5).getInterestPayment());
        assertEquals(new BigDecimal("175375.65"), paymentSchedule.get(5).getDebtPayment());
        assertEquals(new BigDecimal("0.00"), paymentSchedule.get(5).getRemainingDebt());
    }
}

