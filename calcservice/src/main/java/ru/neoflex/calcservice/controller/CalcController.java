package ru.neoflex.calcservice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.neoflex.calcservice.dto.request.LoanStatementRequestDto;
import ru.neoflex.calcservice.dto.request.ScoringDataDto;
import ru.neoflex.calcservice.dto.response.CreditDto;
import ru.neoflex.calcservice.dto.response.LoanOfferDto;
import ru.neoflex.calcservice.service.CalcService;

import java.util.List;

@RestController
@RequestMapping("/calculator")
@RequiredArgsConstructor
@Tag(name = "Calculator API", description = "API для расчета условий кредитования")
public class CalcController {
    private final CalcService calcService;

    @PostMapping("/offers")
    @Operation(
            summary = "Расчет предожений кредитования",
            description = "На основе заявки предоставляется список из 4 вариантов кредитования"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Успешный расчет предложений",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = LoanOfferDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Ошибка валидации входных данных",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Validation Error",
                                            description = "Ошибка валидации полей запроса",
                                            value = """
                                                    {
                                                        "code": "VALIDATION_ERROR",
                                                        "message": "Невалидные параметры запроса",
                                                        "details": {
                                                            "email": "Неверный формат почты",
                                                            "amount": "Размер кредита должен быть не менее 10.000"
                                                        },
                                                        "timestamp": "2026-03-08T12:12:12"
                                                    }"""
                                    )
                            }
                    )
            )
    })
    public ResponseEntity<List<LoanOfferDto>> calculateLoanOffers(
            @Parameter(
                    description = "Заявка с данными на предоставление предложений кредитования",
                    required = true,
                    schema = @Schema(implementation = LoanStatementRequestDto.class)
            )
            @RequestBody @Valid LoanStatementRequestDto loanStatementRequest
    ) {
        List<LoanOfferDto> offers = calcService.prescore(loanStatementRequest);
        return ResponseEntity.ok(offers);
    }

    @PostMapping("/calc")
    @Operation(
            summary = "Расчёт параметров кредита",
            description = "Выполняет расчет параметров кредита на основе выбранного предложения"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Успешный расчет кредита",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = CreditDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Ошибка валидации входных данных",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Validation Error",
                                            description = "Ошибка валидации полей запроса",
                                            value = """
                                                    {
                                                        "code": "VALIDATION_ERROR",
                                                        "message": "Невалидные параметры запроса",
                                                        "details": {
                                                            "email": "Неверный формат почты",
                                                            "amount": "Размер кредита должен быть не менее 10.000"
                                                        },
                                                        "timestamp": "2026-03-08T12:12:12"
                                                    }"""
                                    )
                            }
                    )
            )
    })
    public ResponseEntity<CreditDto> calculateCredit(
            @Parameter(
                    description = "Данные для скоринга и полного расчета кредита",
                    required = true,
                    schema = @Schema(implementation = ScoringDataDto.class)
            )
            @RequestBody @Valid ScoringDataDto scoringData
    ) {
        CreditDto credit = calcService.calc(scoringData);
        return ResponseEntity.ok(credit);
    }
}
