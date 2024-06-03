package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alquileres")
@Inheritance(strategy = InheritanceType.JOINED)
public class Alquiler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "amarra_id", referencedColumnName = "id")
    private Amarra amarra;

    @ManyToOne
    @JoinColumn(name = "embarcacion_id", referencedColumnName = "id")
    private Embarcacion embarcacion;

    private LocalDateTime inicio;

    private LocalDateTime fin;

    public Alquiler() {
    	
    }
    
    public Alquiler(Amarra amarra, Embarcacion embarcacion) {
		this.amarra = amarra;
		this.embarcacion = embarcacion;
		this.inicio = LocalDateTime.now();
	}
    
    public Alquiler(Amarra amarra, Embarcacion embarcacion, LocalDateTime inicio, LocalDateTime fin) {
		this.amarra = amarra;
		this.embarcacion = embarcacion;
		this.inicio = LocalDateTime.now();
		this.inicio = inicio;
		this.fin = fin;
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

    public Embarcacion getEmbarcacion() {
        return embarcacion;
    }

    public void setEmbarcacion(Embarcacion embarcacion) {
        this.embarcacion = embarcacion;
    }

    public LocalDateTime getInicio() {
        return inicio;
    }

    public void setInicio(LocalDateTime inicio) {
        this.inicio = inicio;
    }

    public LocalDateTime getFin() {
        return fin;
    }

    public void setFin(LocalDateTime fin) {
        this.fin = fin;
    }
}
