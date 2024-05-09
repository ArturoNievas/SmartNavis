package com.hexacore.smartnavis_api.model;

import java.util.ArrayList;
import java.util.List;

public class Publicacion {
    private String titulo;
    private String descripcion;
    private Bien bien;
    private List<Permuta> permutas;

    public Publicacion() {
        this.setPermutas(new ArrayList<>());
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Bien getBien() {
        return bien;
    }

    public void setBien(Bien bien) {
        this.bien = bien;
    }

    public List<Permuta> getPermutas() {
        return permutas;
    }

    public void setPermutas(List<Permuta> permutas) {
        this.permutas = permutas;
    }
}
