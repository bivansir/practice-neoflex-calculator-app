package ru.neoflex.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ErrorResponseDto {
    private String code;
    private String message;
    private Object details;
    private LocalDateTime timestamp;
}
