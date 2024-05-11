package com.hexacore.smartnavis_api.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException() {
        super("El recurso solicitado no existe.");
    }

    public NotFoundException(String message) {
        super(message);
    }
}
