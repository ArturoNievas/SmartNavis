package com.hexacore.smartnavis_api.model;

import java.util.Date;

public class Mensaje {
    private String texto;
    private Date fecha;
    private Usuario autor;

    public Mensaje() {
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Usuario getAutor() {
        return autor;
    }

    public void setAutor(Usuario autor) {
        this.autor = autor;
    }
}
