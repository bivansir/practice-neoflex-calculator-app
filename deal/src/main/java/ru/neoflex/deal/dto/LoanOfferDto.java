package ru.neoflex.deal.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoanOfferDto {
    @NotNull
    private UUID statementId;

    @NotNull
    @Schema(example = "10000000")
    private BigDecimal requestedAmount;

    @NotNull
    @Schema(example = "1200000")
    private BigDecimal totalAmount;

    @NotNull
    @Schema(example = "12")
    private Integer term;

    @NotNull
    @Schema(example = "50000")
    private BigDecimal monthlyPayment;

    @NotNull
    @Schema(example = "12.5")
    private BigDecimal rate;

    @NotNull
    @Schema(example = "true")
    private Boolean isInsuranceEnabled;

    @NotNull
    @Schema(example = "true")
    private Boolean isSalaryClient;
}
