package com.hexacore.smartnavis_api.model;

public class AlquilerTercero extends Alquiler {
    private String parentezco;
    private Persona titular;

    public AlquilerTercero() {

    }

    public String getParentezco() {
        return parentezco;
    }

    public void setParentezco(String parentezco) {
        this.parentezco = parentezco;
    }

    public Persona getTitular() {
        return titular;
    }

    public void setTitular(Persona titular) {
        this.titular = titular;
    }
}
