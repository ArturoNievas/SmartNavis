package com.hexacore.smartnavis_api.exceptions;

public class PublicacionNotFoundException extends RuntimeException {
    public PublicacionNotFoundException() {
        super("La publicacion solicitada no existe.");
    }
}
