package com.hexacore.smartnavis_api.model;

public abstract class Bien {
    private Persona titular;

    public Persona getTitular() {
        return titular;
    }

    public void setTitular(Persona titular) {
        this.titular = titular;
    }
}
