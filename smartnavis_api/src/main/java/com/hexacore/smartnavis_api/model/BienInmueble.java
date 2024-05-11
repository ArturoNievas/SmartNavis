package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_inmuebles")
@DiscriminatorValue("I")
@PrimaryKeyJoinColumn(name = "bien_id")
public class BienInmueble extends Bien {
    @Column(unique = true)
    private String partida;

    public BienInmueble() {
        super();
    }

    public String getPartida() {
        return partida;
    }

    public void setPartida(String partida) {
        this.partida = partida;
    }
}
