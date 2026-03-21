package ru.neoflex.deal.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import ru.neoflex.deal.dto.*;
import ru.neoflex.deal.exception.CalculatorServiceException;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@Service
public class CalculatorService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public CalculatorService(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    public List<LoanOfferDto> offers(LoanStatementRequestDto request) {
        return restClient.post()
                .uri("/calculator/offers")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw extractError(res);
                })
                .body(new ParameterizedTypeReference<>() {
                });
    }

    public CreditDto calc(ScoringDataDto request) {
        return restClient.post()
                .uri("/calculator/calc")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    throw extractError(res);
                })
                .body(new ParameterizedTypeReference<>() {
                });
    }

    private CalculatorServiceException extractError(ClientHttpResponse response) throws IOException {
        ErrorResponseDto error = objectMapper.readValue(
                response.getBody(),
                ErrorResponseDto.class
        );

        return new CalculatorServiceException(error);
    }
}
