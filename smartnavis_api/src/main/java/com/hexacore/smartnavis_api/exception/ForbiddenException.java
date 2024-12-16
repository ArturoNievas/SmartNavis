package com.hexacore.smartnavis_api.exception;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super("Acceso no autorizado.");
    }

    public ForbiddenException(String message) {
        super(message);
    }
}
