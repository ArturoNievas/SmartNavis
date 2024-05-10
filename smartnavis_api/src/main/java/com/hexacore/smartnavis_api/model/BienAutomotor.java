package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_automotores")
@PrimaryKeyJoinColumn(name = "bien_id")
public class BienAutomotor extends Bien {
    private String patente;

    public BienAutomotor() {
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }
}
