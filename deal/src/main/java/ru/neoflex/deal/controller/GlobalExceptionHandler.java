package ru.neoflex.deal.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.neoflex.deal.dto.ErrorResponseDto;
import ru.neoflex.deal.exception.CalculatorServiceException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;



@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        log.error("VALIDATION_ERROR: {}", errors);
        return ResponseEntity.badRequest().body(
                ErrorResponseDto.builder()
                        .code("VALIDATION_ERROR")
                        .message("Невалидные параметры запроса")
                        .details(errors)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(CalculatorServiceException.class)
    public ResponseEntity<ErrorResponseDto> handleCalculatorErrorException(
            CalculatorServiceException ex) {

        log.error("CALCULATOR_SERVICE_ERROR: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ErrorResponseDto.builder()
                        .code("CALCULATOR_SERVICE_ERROR")
                        .message("Ошибка МС Калькулятор")
                        .details(ex.getDetails())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDto> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex) {
        String springMessage = ex.getMostSpecificCause().getMessage();

        log.error("BAD_REQUEST {}", springMessage);
        return ResponseEntity.badRequest().body(
                ErrorResponseDto.builder()
                        .code("BAD_REQUEST")
                        .message("Ошибка чтения запроса")
                        .details(springMessage)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleAllExceptions(Exception ex) {

        log.error("INTERNAL_ERROR: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ErrorResponseDto.builder()
                        .code("INTERNAL_ERROR")
                        .message("Внутренняя ошибка сервера")
                        .details(ex.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}
