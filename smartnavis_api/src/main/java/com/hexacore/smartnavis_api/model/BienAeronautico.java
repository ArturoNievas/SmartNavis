package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_nauticoaeronaticos")
@PrimaryKeyJoinColumn(name = "bien_id")
@DiscriminatorValue("N")
@Inheritance(strategy = InheritanceType.JOINED)
public class BienAeronautico extends Bien {
    @Column(unique = true)
    private String matricula;

    public BienAeronautico() {
        super();
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
}
