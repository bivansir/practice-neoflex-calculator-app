package ru.neoflex.calcservice.controller;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.neoflex.calcservice.exception.BusinessValidationException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExpectionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        log.error("VALIDATION_ERROR: {}", errors);
        return ResponseEntity.badRequest().body(
                ErrorResponse.builder()
                        .code("VALIDATION_ERROR")
                        .message("Невалидные параметры запроса")
                        .details(errors)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(BusinessValidationException.class)
    public ResponseEntity<ErrorResponse> handleBusinessValidation(
            BusinessValidationException ex) {

        log.error("VALIDATION_ERROR: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(
                ErrorResponse.builder()
                        .code("VALIDATION_ERROR")
                        .message("Прескоринг не пройден")
                        .details(ex.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex) {
        String springMessage = ex.getMostSpecificCause().getMessage();

        log.error("BAD_REQUEST {}", springMessage);
        return ResponseEntity.badRequest().body(
                ErrorResponse.builder()
                        .code("BAD_REQUEST")
                        .message("Ошибка чтения запроса")
                        .details(springMessage)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex) {

        log.error("INTERNAL_ERROR: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ErrorResponse.builder()
                        .code("INTERNAL_ERROR")
                        .message("Внутренняя ошибка сервера")
                        .details(ex.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}

@Data
@Builder
class ErrorResponse {
    private String code;
    private String message;
    private Object details;
    private LocalDateTime timestamp;
}

