package com.hexacore.smartnavis_api.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("Las credenciales provistas son inválidas.");
    }

    public UnauthorizedException(String message) {
        super(message);
    }
}
