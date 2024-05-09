package com.hexacore.smartnavis_api.model;

import java.util.ArrayList;
import java.util.List;

public class Permuta {
    private Publicacion solicitada;
    private Publicacion ofertada;
    private boolean pendiente;
    private boolean aceptada;
    private boolean registrada;
    private boolean finalizada;
    private List<Mensaje> mensajes;

    public Permuta() {
        this.setMensajes(new ArrayList<>());
    }

    public Publicacion getSolicitada() {
        return solicitada;
    }

    public void setSolicitada(Publicacion solicitada) {
        this.solicitada = solicitada;
    }

    public Publicacion getOfertada() {
        return ofertada;
    }

    public void setOfertada(Publicacion ofertada) {
        this.ofertada = ofertada;
    }

    public boolean isPendiente() {
        return pendiente;
    }

    public void setPendiente(boolean pendiente) {
        this.pendiente = pendiente;
    }

    public boolean isAceptada() {
        return aceptada;
    }

    public void setAceptada(boolean aceptada) {
        this.aceptada = aceptada;
    }

    public boolean isRegistrada() {
        return registrada;
    }

    public void setRegistrada(boolean registrada) {
        this.registrada = registrada;
    }

    public boolean isFinalizada() {
        return finalizada;
    }

    public void setFinalizada(boolean finalizada) {
        this.finalizada = finalizada;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }
}
