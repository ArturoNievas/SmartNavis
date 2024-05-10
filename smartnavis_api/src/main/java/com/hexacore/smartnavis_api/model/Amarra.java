package com.hexacore.smartnavis_api.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "amarras")
public class Amarra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private double slora;

    private double calado;

    private double manga;

    @ManyToOne
    @JoinColumn(name = "puerto_id", referencedColumnName = "id")
    private Puerto puerto;

    @OneToMany(mappedBy = "amarra")
    private List<DisponibilidadAmarra> disponibilidades;

    @OneToMany(mappedBy = "amarra")
    private List<Alquiler> alquileres;

    public Amarra() {
        this.setDisponibilidades(new ArrayList<>());
        this.setAlquileres(new ArrayList<>());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getSlora() {
        return slora;
    }

    public void setSlora(double slora) {
        this.slora = slora;
    }

    public double getCalado() {
        return calado;
    }

    public void setCalado(double calado) {
        this.calado = calado;
    }

    public double getManga() {
        return manga;
    }

    public void setManga(double manga) {
        this.manga = manga;
    }

    public Puerto getPuerto() {
        return puerto;
    }

    public void setPuerto(Puerto puerto) {
        this.puerto = puerto;
    }

    public List<DisponibilidadAmarra> getDisponibilidades() {
        return disponibilidades;
    }

    public void setDisponibilidades(List<DisponibilidadAmarra> disponibilidades) {
        this.disponibilidades = disponibilidades;
    }

    public List<Alquiler> getAlquileres() {
        return alquileres;
    }

    public void setAlquileres(List<Alquiler> alquileres) {
        this.alquileres = alquileres;
    }
}
