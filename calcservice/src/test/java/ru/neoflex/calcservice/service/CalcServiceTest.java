package ru.neoflex.calcservice.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.neoflex.calcservice.properties.CalcProperties;
import ru.neoflex.calcservice.util.BaseTest;
import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.dto.response.PaymentScheduleElementDto;
import ru.neoflex.calcservice.exception.BusinessValidationException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CalcServiceTest extends BaseTest {
    @Mock
    private CalcProperties calcProperties;

    @InjectMocks
    private CalcService calcService;

    @Test
    void businessValidationUnderAgeExceptionTest() {
        //given
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        request.setBirthdate(LocalDate.parse("2014-08-25", formatter));

        //when
        //then
        BusinessValidationException underAgeException = assertThrows(
                BusinessValidationException.class,
                () -> calcService.prescore(request)
        );
        assertEquals("birthdate: Клиент должен быть старше 18 лет", underAgeException.getMessage());
    }

    @Test
    void businessValidationOverAgeExceptionTest() {
        //given
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        request.setBirthdate(LocalDate.parse("1962-08-25", formatter));

        //when
        //then
        BusinessValidationException overAgeException = assertThrows(
                BusinessValidationException.class,
                () -> calcService.prescore(request)
        );
        assertEquals("birthdate: Возраст клиента на момент окончания кредита не может быть больше 65 лет", overAgeException.getMessage());
    }

    @Test
    void prescoreDefaultCalculatingTest() {
        //given
        when(calcProperties.getInsurancePacketCost()).thenReturn(new BigDecimal("10000"));
        when(calcProperties.getCommissionRate()).thenReturn(new BigDecimal("0.4"));
        when(calcProperties.getBaseRate()).thenReturn(new BigDecimal("0.25"));
        when(calcProperties.getMinRate()).thenReturn(new BigDecimal("0.20"));
        when(calcProperties.getSalaryClientDiscount()).thenReturn(new BigDecimal("0.02"));
        when(calcProperties.getSmallCreditLimit()).thenReturn(new BigDecimal("500000"));

        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        //when
        List<LoanOfferDto> offers = calcService.prescore(request);

        LoanOfferDto withBoth = offers.get(0);
        LoanOfferDto withSalaryOnly = offers.get(1);
        LoanOfferDto withInsuranceOnly = offers.get(2);
        LoanOfferDto withoutDiscounts = offers.get(3);

        //then
        assertEquals(4, offers.size());

        assertEquals(new BigDecimal("0.226"), withBoth.getRate());
        assertEquals(new BigDecimal(1030000), withBoth.getTotalAmount());
        assertEquals(new BigDecimal(39657), withBoth.getMonthlyPayment());

        assertEquals(new BigDecimal("0.230"), withSalaryOnly.getRate());
        assertEquals(new BigDecimal(1000000), withSalaryOnly.getTotalAmount());
        assertEquals(new BigDecimal(38710), withSalaryOnly.getMonthlyPayment());

        assertEquals(new BigDecimal("0.246"), withInsuranceOnly.getRate());
        assertEquals(new BigDecimal(1030000), withInsuranceOnly.getTotalAmount());
        assertEquals(new BigDecimal(40735), withInsuranceOnly.getMonthlyPayment());

        assertEquals(new BigDecimal("0.250"), withoutDiscounts.getRate());
        assertEquals(new BigDecimal(1000000), withoutDiscounts.getTotalAmount());
        assertEquals(new BigDecimal(39760), withoutDiscounts.getMonthlyPayment());
    }

    @Test
    void BigCreditDefaultPaymentScheduleCalculatingTest() {
        //given
        when(calcProperties.getBaseRate()).thenReturn(new BigDecimal("0.25"));
        when(calcProperties.getMinRate()).thenReturn(new BigDecimal("0.20"));

        ScoringDataDto request = createScoringDataDto();

        //when
        CreditDto credit = calcService.calc(request);

        List<PaymentScheduleElementDto> paymentSchedule = credit.getPaymentSchedule();

        //then
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

    @Test
    void SmallCreditWithInsuranceRatePskCalculatingTest() {
        //given
        when(calcProperties.getBaseRate()).thenReturn(new BigDecimal("0.25"));
        when(calcProperties.getMinRate()).thenReturn(new BigDecimal("0.20"));
        when(calcProperties.getSmallCreditLimit()).thenReturn(new BigDecimal("500000"));
        when(calcProperties.getInsuranceCostMultiplier()).thenReturn(new BigDecimal("0.01"));
        when(calcProperties.getInsurancePercentDiscount()).thenReturn(new BigDecimal("0.01"));

        ScoringDataDto request = createScoringDataDto();
        request.setAmount(new BigDecimal("400000"));
        request.setIsInsuranceEnabled(true);

        //when
        CreditDto creditDto = calcService.calc(request);

        //then
        assertEquals(new BigDecimal("402000"), creditDto.getPsk());
        assertEquals(new BigDecimal("0.240"), creditDto.getRate());
    }
}


