package ru.neoflex.deal.service.unit;

import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.dto.ScoringDataDto;
import ru.neoflex.deal.exception.CalculatorServiceException;
import ru.neoflex.deal.service.CalculatorService;
import tools.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@ExtendWith(MockitoExtension.class)
public class CalculatorServiceTest {

    private CalculatorService calculatorService;

    private MockRestServiceServer server;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder();
        server = MockRestServiceServer.bindTo(builder).build();

        RestClient restClient = builder
                .baseUrl("http://localhost")
                .build();
        ObjectMapper objectMapper = new ObjectMapper();

        calculatorService = new CalculatorService(restClient, objectMapper);
    }

    @Test
    @SneakyThrows
    void shouldReturnOffers() {
        // given
        String exceptedResponse = Files.readString(Paths.get(
                "src/test/resources/should_return_offers-excepted_response.json"));

        server.expect(requestTo("http://localhost/calculator/offers"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(exceptedResponse, MediaType.APPLICATION_JSON));

        // when
        List<LoanOfferDto> result = calculatorService.offers(LoanStatementRequestDto.builder().build());

        // then
        assertNotNull(result);
        assertEquals(BigDecimal.valueOf(1), result.get(0).getRequestedAmount());
        assertEquals(BigDecimal.valueOf(2), result.get(1).getRequestedAmount());
        server.verify();
    }

    @Test
    @SneakyThrows
    void shouldReturnCredit() {
        // given
        String exceptedResponse = Files.readString(Paths.get(
                "src/test/resources/should_return_credit-excepted_response.json"));

        server.expect(requestTo("http://localhost/calculator/calc"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(exceptedResponse, MediaType.APPLICATION_JSON));

        // when
        CreditDto result = calculatorService.calc(ScoringDataDto.builder().build());

        // then
        assertNotNull(result);
        assertEquals(BigDecimal.valueOf(1), result.getAmount());
        server.verify();
    }

    @Test
    @SneakyThrows
    void shouldThrowExceptionTest() {
        // given
        String errorJson = Files.readString(Paths.get(
                "src/test/resources/should_throw_exception-error.json"));

        server.expect(requestTo("http://localhost/calculator/offers"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withStatus(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(errorJson));

        // then
        assertThrows(CalculatorServiceException.class,
                // when
                () -> calculatorService.offers(LoanStatementRequestDto.builder().build()));
        server.verify();
    }
}
