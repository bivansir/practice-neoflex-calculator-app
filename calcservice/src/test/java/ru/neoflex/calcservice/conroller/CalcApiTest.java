package ru.neoflex.calcservice.conroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
    void offersEndpointValidTest() throws Exception {
        List<LoanOfferDto> mockOffers = List.of(
                createDefaultLoanOfferDto()
        );
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenReturn(mockOffers);
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        mockMvc.perform(post("/calculator/offers")  // <- это статический импорт из MockMvcRequestBuilders
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].requestedAmount").value(1000000));
    }

    @Test
    void offersEndpointInvalidParamsTest() throws Exception {
        List<LoanOfferDto> mockOffers = List.of(
                createDefaultLoanOfferDto()
        );
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenReturn(mockOffers);
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();
        request.setEmail("awdqdqdqwd");
        request.setAmount(BigDecimal.valueOf(100));

        mockMvc.perform(post("/calculator/offers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.email").exists())
                .andExpect(jsonPath("$.details.amount").exists());
    }

    @Test
    void offersEndpointInvalidBusinessParamsTest() throws Exception {
        when(calcService.prescore(any(LoanStatementRequestDto.class)))
                .thenThrow(new BusinessValidationException("Прескоринг не пройден: возраст менее 18 лет"));
        LoanStatementRequestDto request = createDefaultLoanStatementRequestDto();

        mockMvc.perform(post("/calculator/offers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Прескоринг не пройден"));
    }

    @Test
    void calcEndpointValidTest() throws Exception {
        CreditDto mockCredit = createDefaultCreditDto();
        when(calcService.calc(any(ScoringDataDto.class)))
                .thenReturn(mockCredit);
        ScoringDataDto request = createScoringDataDto();

        mockMvc.perform(post("/calculator/calc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.amount").value(1000000));
    }

}
