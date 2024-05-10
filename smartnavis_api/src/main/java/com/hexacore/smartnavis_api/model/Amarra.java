package com.hexacore.smartnavis_api.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "amarras", uniqueConstraints = @UniqueConstraint(columnNames = {"puerto_id", "nombre"}))
public class Amarra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private double eslora;

    private double calado;

    private double manga;

    @ManyToOne
    @JoinColumn(name = "puerto_id", referencedColumnName = "id")
    private Puerto puerto;

    @JsonIgnore
    @OneToMany(mappedBy = "amarra")
    private List<DisponibilidadAmarra> disponibilidades;

    @JsonIgnore
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

    public double getEslora() {
        return eslora;
    }

    public void setEslora(double slora) {
        this.eslora = slora;
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

    public void addDisponibilidad(DisponibilidadAmarra disponibilidad) {
        if (disponibilidad != null) {
            List<DisponibilidadAmarra> disponibilidades = this.getDisponibilidades();
            if (!disponibilidades.contains(disponibilidad)) {
                disponibilidades.add(disponibilidad);
                disponibilidad.setAmarra(this);
            }
        }
    }

    public void removeDisponibilidad(DisponibilidadAmarra disponibilidad) {
        this.getDisponibilidades().remove(disponibilidad);
    }

    public List<Alquiler> getAlquileres() {
        return alquileres;
    }

    public void setAlquileres(List<Alquiler> alquileres) {
        this.alquileres = alquileres;
    }

    public void addAlquiler(Alquiler alquiler) {
        if (alquiler != null) {
            List<Alquiler> alquileres = this.getAlquileres();
            if (!alquileres.contains(alquiler)) {
                alquileres.add(alquiler);
                alquiler.setAmarra(this);
            }
        }
    }

    public void removeAlquiler(Alquiler alquiler) {
        this.getAlquileres().remove(alquiler);
    }
}
