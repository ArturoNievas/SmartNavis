package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_nauticoaeronaticos")
@PrimaryKeyJoinColumn(name = "bien_id")
@Inheritance(strategy = InheritanceType.JOINED)
public class BienNauticoAeronautico extends Bien {
    @Column(unique = true)
    private String matricula;

    public BienNauticoAeronautico() {
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
}
