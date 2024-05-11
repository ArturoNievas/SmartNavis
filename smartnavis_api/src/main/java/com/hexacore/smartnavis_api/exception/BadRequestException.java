package com.hexacore.smartnavis_api.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException() {
        super("Error del lado cliente.");
    }

    public BadRequestException(String message) {
        super(message);
    }
}
