package ru.neoflex.calcservice.service;

import lombok.Getter;

@Getter
public class BusinessValidationException extends RuntimeException {

    public BusinessValidationException(String message) {
        super(message);
    }
}
