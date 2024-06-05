package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "alquileres_terceros")
@PrimaryKeyJoinColumn(name = "alquiler_id")
public class AlquilerTercero extends Alquiler {
    private String parentezco;

    @ManyToOne
    @JoinColumn(name = "persona_id", referencedColumnName = "id")
    private Persona titular;

    public AlquilerTercero() {
	}

	public AlquilerTercero(Amarra amarra, Embarcacion embarcacion, Persona titular, String parentezco) {
    	super(amarra, embarcacion);
    	this.titular = titular;
    	this.parentezco = parentezco;
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
