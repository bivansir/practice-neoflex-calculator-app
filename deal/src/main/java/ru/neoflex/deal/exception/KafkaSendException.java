package ru.neoflex.deal.exception;

import lombok.Getter;

@Getter
public class KafkaSendException extends RuntimeException {

    private final Object details;

    public KafkaSendException(String message, Throwable cause, Object details) {
        super(message, cause);
        this.details = details;
    }

    public KafkaSendException(String message, Throwable cause) {
        this(message, cause, null);
    }
}
