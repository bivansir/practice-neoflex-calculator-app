package ru.neoflex.deal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import ru.neoflex.deal.dto.*;
import ru.neoflex.deal.exception.CalculatorServiceException;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CalculatorService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public List<LoanOfferDto> offers(LoanStatementRequestDto request) {
        log.debug("Запрос подан в МС Калькулятор calculator/offers: {}",
                request);
        List<LoanOfferDto> response = restClient.post()
                .uri("/calculator/offers")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw extractError(res);
                })
                .body(new ParameterizedTypeReference<>() {
                });
        log.debug("Получен ответ от МС Калькулятор calculator/offers: {}",
                response);
        return new ArrayList<>(response == null ? List.of() : response);
    }

    public CreditDto calc(ScoringDataDto request) {
        log.debug("Запрос подан в МС Калькулятор calculator/calc: {}",
                request);
        CreditDto response = restClient.post()
                .uri("/calculator/calc")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw extractError(res);
                })
                .body(new ParameterizedTypeReference<>() {
                });
        log.debug("Получен ответ от МС Калькулятор calculator/calc: {}",
                response);
        return response;
    }

    private CalculatorServiceException extractError(ClientHttpResponse response) throws IOException {
        ErrorResponseDto error = objectMapper.readValue(
                response.getBody(),
                ErrorResponseDto.class
        );

        return new CalculatorServiceException(error);
    }
}
