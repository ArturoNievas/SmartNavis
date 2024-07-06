package com.hexacore.smartnavis_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hexacore.smartnavis_api.exception.BadRequestException;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "permutas")
public class Permuta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "publicacion_id_solicitada", referencedColumnName = "id")
    private Publicacion solicitada;

    @ManyToOne
    @JoinColumn(name = "publicacion_id_ofertada", referencedColumnName = "id")
    private Publicacion ofertada;

    private boolean pendiente;

    private boolean aceptada;

    private boolean registrada;

    private boolean finalizada;

    @JsonIgnore
    @OneToMany(mappedBy = "permuta", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Mensaje> mensajes;

    public Permuta() {
        this.pendiente = true;
        this.aceptada = false;
        this.registrada = false;
        this.finalizada = false;
        this.setMensajes(new ArrayList<>());
    }

    public Permuta(Publicacion solicitada, Publicacion ofertada) {
        this.solicitada = solicitada;
        this.ofertada = ofertada;
        this.pendiente = true;
        this.aceptada = false;
        this.registrada = false;
        this.finalizada = false;
        this.setMensajes(new ArrayList<>());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void addMensaje(Mensaje mensaje) {
        if (mensaje != null) {
            List<Mensaje> mensajes = getMensajes();
            if (!mensajes.contains(mensaje)) {
                mensajes.add(mensaje);
                mensaje.setPermuta(this);
            }
        }
    }

    public void removeMensaje(Mensaje mensaje) {
        this.getMensajes().remove(mensaje);
    }
    
    public boolean usuariosHabilitados() {
    	if (!this.getOfertada().isUsuarioHabilitado() && !this.getSolicitada().isUsuarioHabilitado()) {
			throw new BadRequestException("Los titulares de los bienes no se encuentran habilitados para realizar intercambios.");
		}
		if (!this.getOfertada().isUsuarioHabilitado()) {
			throw new BadRequestException("El titular del bien ofertado no se encuentra habilitado para realizar intercambios.");
		}
		if (!this.getSolicitada().isUsuarioHabilitado()) {
			throw new BadRequestException("El titular del bien solicitado no se encuentra habilitado para realizar intercambios.");
		}
    	return true;
    }
    
    public boolean bienesHabilitados() {
    	if (!this.getOfertada().isBienHabilitado() && !this.getSolicitada().isBienHabilitado()) {
			throw new BadRequestException("Los bienes no se encuentran habilitados para ser intercambiados.");
		}
		if (!this.getOfertada().isBienHabilitado()) {
			throw new BadRequestException("El bien ofertado no se encuentra habilitado para ser intercambiados.");
		}
		if (!this.getSolicitada().isBienHabilitado()) {
			throw new BadRequestException("El bien solicitado no se encuentra habilitado para ser intercambiados.");
		}
    	return true;
    }
}
