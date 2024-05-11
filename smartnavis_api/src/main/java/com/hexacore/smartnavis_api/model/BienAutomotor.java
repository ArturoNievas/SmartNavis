package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_automotores")
@DiscriminatorValue("A")
@PrimaryKeyJoinColumn(name = "bien_id")
public class BienAutomotor extends Bien {
    @Column(unique = true)
    private String patente;

    public BienAutomotor() {
        super();
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }
}
