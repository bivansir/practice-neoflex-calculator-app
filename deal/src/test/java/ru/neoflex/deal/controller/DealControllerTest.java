package ru.neoflex.deal.controller;

import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.neoflex.deal.dto.ErrorResponseDto;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.exception.CalculatorServiceException;
import ru.neoflex.deal.service.DealService;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@WebMvcTest
public class DealControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DealService dealService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @SneakyThrows
    void statementEndpointValidTest() {
        //given
        LoanStatementRequestDto request = LoanStatementRequestDto.builder()
                .amount(BigDecimal.valueOf(1000000))
                .term(36)
                .firstName("Илья")
                .lastName("Семенов")
                .middleName("Игоревич")
                .email("bivansir@gmail.com")
                .birthdate(LocalDate.parse("2004-08-25"))
                .passportSeries("3232")
                .passportNumber("123123")
                .build();
        LoanOfferDto offer = LoanOfferDto.builder()
                .statementId(UUID.randomUUID())
                .requestedAmount(BigDecimal.valueOf(1000000))
                .totalAmount(BigDecimal.valueOf(1000000))
                .term(36)
                .monthlyPayment(BigDecimal.valueOf(12000))
                .rate(BigDecimal.valueOf(0.25))
                .isInsuranceEnabled(false)
                .isSalaryClient(false)
                .build();
        List<LoanOfferDto> response = List.of(offer, offer);

        when(dealService.deal(any(LoanStatementRequestDto.class)))
                .thenReturn(response);

        //when
        mockMvc.perform(post("/deal/statement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].statementId").exists())
                .andExpect(jsonPath("$[0].requestedAmount").exists())
                .andExpect(jsonPath("$[0].totalAmount").exists())
                .andExpect(jsonPath("$[0].term").exists())
                .andExpect(jsonPath("$[0].monthlyPayment").exists())
                .andExpect(jsonPath("$[0].rate").exists())
                .andExpect(jsonPath("$[0].isInsuranceEnabled").exists())
                .andExpect(jsonPath("$[0].isSalaryClient").exists());
    }

    @Test
    @SneakyThrows
    void statementEndpointInvalidParamsTest() {
        // given
        LoanStatementRequestDto request = LoanStatementRequestDto.builder()
                .amount(BigDecimal.valueOf(11))
                .term(36)
                .firstName("Илья")
                .lastName("Семенов")
                .middleName("Игоревич")
                .email("wdqdqdas")
                .birthdate(LocalDate.parse("2004-08-25"))
                .passportSeries("3232")
                .passportNumber("123123")
                .build();

        //when
        mockMvc.perform(post("/deal/statement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                // then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").value("Невалидные параметры запроса"))
                .andExpect(jsonPath("$.details.email").exists())
                .andExpect(jsonPath("$.details.amount").exists())
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @SneakyThrows
    void selectEndpointValidTest() {
        //given
        LoanOfferDto request = LoanOfferDto.builder()
                .statementId(UUID.randomUUID())
                .requestedAmount(BigDecimal.valueOf(124))
                .totalAmount(BigDecimal.valueOf(124))
                .term(12)
                .monthlyPayment(BigDecimal.valueOf(124))
                .rate(BigDecimal.valueOf(1))
                .isInsuranceEnabled(true)
                .isSalaryClient(true)
                .build();

        // when
        mockMvc.perform(post("/deal/select")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                )
                //then
                .andExpect(status().isOk());
    }

    @Test
    @SneakyThrows
    void endpointInvalidJsonTest() {
        //given
        String invalidJson = "fdasdqd";

        //when
        mockMvc.perform(post("/deal/select")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value("Ошибка чтения запроса"))
                .andExpect(jsonPath("$.details").exists())
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @SneakyThrows
    void endpointCalculatorExceptionTest() {
        //given
        ErrorResponseDto error = ErrorResponseDto.builder()
                .message("Ошибка")
                .build();
        doThrow(new CalculatorServiceException(error))
                .when(dealService)
                .select(any());

        //when
        mockMvc.perform(post("/deal/select")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(LoanOfferDto.builder()
                                .statementId(UUID.randomUUID())
                                .requestedAmount(BigDecimal.valueOf(124))
                                .totalAmount(BigDecimal.valueOf(124))
                                .term(12)
                                .monthlyPayment(BigDecimal.valueOf(124))
                                .rate(BigDecimal.valueOf(1))
                                .isInsuranceEnabled(true)
                                .isSalaryClient(true)
                                .build())))
                //then
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").value("CALCULATOR_SERVICE_ERROR"))
                .andExpect(jsonPath("$.message").value("Ошибка МС Калькулятор"))
                .andExpect(jsonPath("$.details").exists())
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @SneakyThrows
    void endpointOtherExceptionsTest() {
        //given
        doThrow(new RuntimeException("Непредвиденная ошибка"))
                .when(dealService)
                .select(any());

        //when
        mockMvc.perform(post("/deal/select")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(LoanOfferDto.builder()
                                .statementId(UUID.randomUUID())
                                .requestedAmount(BigDecimal.valueOf(124))
                                .totalAmount(BigDecimal.valueOf(124))
                                .term(12)
                                .monthlyPayment(BigDecimal.valueOf(124))
                                .rate(BigDecimal.valueOf(1))
                                .isInsuranceEnabled(true)
                                .isSalaryClient(true)
                                .build())))
                //then
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").value("INTERNAL_ERROR"))
                .andExpect(jsonPath("$.message").value("Внутренняя ошибка сервера"))
                .andExpect(jsonPath("$.details").value("Непредвиденная ошибка"))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}
