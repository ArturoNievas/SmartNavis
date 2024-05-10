package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "disponibilidad_amarras")
public class DisponibilidadAmarra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "amarra_id", referencedColumnName = "id")
    private Amarra amarra;

    private Date inicio;

    private Date fin;

    public DisponibilidadAmarra() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Amarra getAmarra() {
        return amarra;
    }

    public void setAmarra(Amarra amarra) {
        this.amarra = amarra;
    }

    public Date getInicio() {
        return inicio;
    }

    public void setInicio(Date inicio) {
        this.inicio = inicio;
    }

    public Date getFin() {
        return fin;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }
}
