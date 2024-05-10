package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "embarcaciones")
@PrimaryKeyJoinColumn(name = "bien_id")
@DiscriminatorValue("E")
public class Embarcacion extends BienNauticoAeronautico {
    private String nombre;

    private double eslora;

    private double calado;

    private double manga;

    public Embarcacion() {
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
}
