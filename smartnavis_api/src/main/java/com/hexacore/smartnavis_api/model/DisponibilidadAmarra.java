package com.hexacore.smartnavis_api.model;

import java.util.Date;

public class DisponibilidadAmarra {
    private Amarra amarra;
    private Date inicio;
    private Date fin;

    public DisponibilidadAmarra() {
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
