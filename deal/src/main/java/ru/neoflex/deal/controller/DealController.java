package ru.neoflex.deal.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.service.DealService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/deal")
@RequiredArgsConstructor
@Tag(name = "Deal API", description = "API для заключения сделок")
public class DealController {
    private final DealService dealService;

    @PostMapping("statement")
    @Operation(
            summary = "Создание сделки",
            description = "На основе заявки предоставляется список из 4 вариантов кредитования, создается сделка"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Успешное создание сделки",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = LoanOfferDto.class)
                    )
            )
    })
    public ResponseEntity<List<LoanOfferDto>> makeStatement(
            @Parameter(
                    description = "Заявка с данными на предоставление предложений кредитования",
                    required = true,
                    schema = @Schema(implementation = LoanStatementRequestDto.class)
            )
            @RequestBody @Valid LoanStatementRequestDto request) {
        log.info("Входные данные приняты {}", request);
        List<LoanOfferDto> offers = dealService.deal(request);
        log.info("Выходные данные получены {}", offers);
        return ResponseEntity.ok(offers);
    }

    @PostMapping("select")
    @Operation(
            summary = "Выбор кредитного предложения",
            description = "Подтверждает сделку с выбранным предложением кредита"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Успешное создание сделки"
            )

    })
    public ResponseEntity<HttpStatus> selectStatement(
            @Parameter(
                    description = "Выбранное кредитное предложение",
                    required = true,
                    schema = @Schema(implementation = LoanOfferDto.class)
            )
            @RequestBody @Valid LoanOfferDto request) {
        log.info("Входные данные приняты {}", request);
        dealService.select(request);
        log.info("Запрос обработан");
        return ResponseEntity.ok().build();
    }
}
