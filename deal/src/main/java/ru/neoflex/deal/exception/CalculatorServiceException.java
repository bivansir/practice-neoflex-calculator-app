package ru.neoflex.deal.exception;

import lombok.Getter;
import ru.neoflex.deal.dto.ErrorResponseDto;

public class CalculatorServiceException extends RuntimeException {
    @Getter
    private final ErrorResponseDto details;

    public CalculatorServiceException(ErrorResponseDto error) {
        super(error.getMessage());
        this.details = error;
    }
}
