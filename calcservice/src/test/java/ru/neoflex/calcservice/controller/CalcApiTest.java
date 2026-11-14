package ru.neoflex.calcservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.neoflex.calcservice.util.BaseTest;
import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.exception.BusinessValidationException;
import ru.neoflex.calcservice.service.CalcService;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@WebMvcTest
class CalcApiTest extends BaseTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CalcService calcService;

    protected ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    @Test
    @SneakyThrows
    void offersEndpointValidTest() {
        //given
        LoanOfferDto mockOffer = createDefaultLoanOfferDto();
        List<LoanOfferDto> mockOffers = List.of(
                mockOffer, mockOffer
        );
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenReturn(mockOffers);

        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        //when
        mockMvc.perform(post("/calculator/offers")
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
    void endpointInvalidParamsTest() {
        //given
        List<LoanOfferDto> mockOffers = List.of(
                createDefaultLoanOfferDto()
        );
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenReturn(mockOffers);

        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        request.setEmail("awdqdqdqwd");
        request.setAmount(BigDecimal.valueOf(100));

        //when
        mockMvc.perform(post("/calculator/offers")
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
    void endpointInvalidBusinessParamsTest() {
        //given
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenThrow(new BusinessValidationException("Прескоринг не пройден: возраст менее 18 лет"));
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        //when
        mockMvc.perform(post("/calculator/offers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").value("Прескоринг не пройден"))
                .andExpect(jsonPath("$.details").exists())
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @SneakyThrows
    void endpointInvalidJsonTest() {
        //given
        String invalidJson = "fdasdqd";

        //when
        mockMvc.perform(post("/calculator/offers")
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
    void endpointOtherExceptionsTest() {
        //given
        when(calcService.prescore(any()))
                .thenThrow(new RuntimeException("Непредвиденная ошибка"));
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        //when
        mockMvc.perform(post("/calculator/offers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                //then
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").value("INTERNAL_ERROR"))
                .andExpect(jsonPath("$.message").value("Внутренняя ошибка сервера"))
                .andExpect(jsonPath("$.details").value("Непредвиденная ошибка"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @SneakyThrows
    void calcEndpointValidTest() {
        //given
        CreditDto mockCredit = createDefaultCreditDto();
        when(calcService.calc(any(ScoringDataDto.class)))
                .thenReturn(mockCredit);

        ScoringDataDto request = createScoringDataDto();

        //when
        mockMvc.perform(post("/calculator/calc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                //then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.amount").exists())
                .andExpect(jsonPath("$.term").exists())
                .andExpect(jsonPath("$.rate").exists())
                .andExpect(jsonPath("$.monthlyPayment").exists())
                .andExpect(jsonPath("$.psk").exists())
                .andExpect(jsonPath("$.isInsuranceEnabled").exists())
                .andExpect(jsonPath("$.isSalaryClient").exists())

                .andExpect(jsonPath("$.paymentSchedule").isArray())
                .andExpect(jsonPath("$.paymentSchedule.length()").value(1))

                .andExpect(jsonPath("$.paymentSchedule[0].number").exists())
                .andExpect(jsonPath("$.paymentSchedule[0].date").exists())
                .andExpect(jsonPath("$.paymentSchedule[0].totalPayment").exists())
                .andExpect(jsonPath("$.paymentSchedule[0].interestPayment").exists())
                .andExpect(jsonPath("$.paymentSchedule[0].debtPayment").exists())
                .andExpect(jsonPath("$.paymentSchedule[0].remainingDebt").exists());
    }
}
