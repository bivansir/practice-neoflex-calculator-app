package ru.neoflex.calcservice.exception;

import lombok.Getter;

@Getter
public class BusinessValidationException extends RuntimeException {

    public BusinessValidationException(String message) {
        super(message);
    }
}
