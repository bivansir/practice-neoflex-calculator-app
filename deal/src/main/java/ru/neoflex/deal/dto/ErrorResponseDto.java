package ru.neoflex.deal.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponseDto {
    private String code;
    private String message;
    private Object details;
    private LocalDateTime timestamp;
}
