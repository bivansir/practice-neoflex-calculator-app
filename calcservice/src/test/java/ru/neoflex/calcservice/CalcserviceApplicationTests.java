package ru.neoflex.calcservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
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
class CalcServiceTest {

    @Autowired
    private CalcService calcService;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    private LoanStatementRequestDto request = LoanStatementRequestDto.builder()
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

    @Test
    void businessValidationExceptionTest() {
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
    void prescoreTest() {
        LoanStatementRequestDto request = LoanStatementRequestDto.builder()
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
}

