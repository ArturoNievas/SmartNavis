package com.hexacore.smartnavis_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "bienes")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo", discriminatorType = DiscriminatorType.CHAR)
@DiscriminatorValue("B")
public abstract class Bien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "persona_id", referencedColumnName = "id")
    private Persona titular;

    @JsonIgnore
    @OneToOne(mappedBy = "bien")
    private Publicacion publicacion;

    @Column(name = "habilitado_intercambio")
    private boolean habilitadoIntercambio;

    protected Bien() {
        this.setHabilitadoIntercambio(true);
    }
    
    protected Bien(Persona titular) {
        this.setHabilitadoIntercambio(true);
        this.titular = titular;
    }

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

    public Publicacion getPublicacion() {
        return publicacion;
    }

    public void setPublicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
    }

    public boolean isHabilitadoIntercambio() {
        return habilitadoIntercambio;
    }

    public void setHabilitadoIntercambio(boolean habilitado) {
        this.habilitadoIntercambio = habilitado;
    }
}
