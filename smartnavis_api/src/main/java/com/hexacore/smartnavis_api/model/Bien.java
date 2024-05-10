package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Bien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "persona_id", referencedColumnName = "id")
    private Persona titular;

    @OneToOne(mappedBy = "bien")
    private Publicacion publicacion;

    public Persona getTitular() {
        return titular;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitular(Persona titular) {
        this.titular = titular;
    }
}
