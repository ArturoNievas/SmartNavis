package com.hexacore.smartnavis_api.model;

import java.util.Date;

public class Alquiler {
    private Amarra amarra;
    private Embarcacion embarcacion;
    private Date inicio;
    private Date fin;

    public Alquiler() {
    }

    public Amarra getAmarra() {
        return amarra;
    }

    public void setAmarra(Amarra amarra) {
        this.amarra = amarra;
    }

    public Embarcacion getEmbarcacion() {
        return embarcacion;
    }

    public void setEmbarcacion(Embarcacion embarcacion) {
        this.embarcacion = embarcacion;
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
