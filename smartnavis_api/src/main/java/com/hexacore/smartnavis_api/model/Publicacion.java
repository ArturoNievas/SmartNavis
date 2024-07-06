package com.hexacore.smartnavis_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "publicaciones")
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    private String descripcion;

    @OneToOne(optional = false)
    @JoinColumn(updatable = false)
    private Bien bien;

    @JsonIgnore
    @OneToMany(mappedBy = "solicitada", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Permuta> permutasSolicitadas;

    @JsonIgnore
    @OneToMany(mappedBy = "ofertada", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Permuta> permutasOfertadas;

    public Publicacion() {
        this.setPermutasSolicitadas(new ArrayList<>());
        this.setPermutasOfertadas(new ArrayList<>());
    }

    public Publicacion(String titulo, String descripcion, Bien bien) {
        this.setTitulo(titulo);
        this.setDescripcion(descripcion);
        this.setBien(bien);
        bien.setPublicacion(this);
        this.setPermutasSolicitadas(new ArrayList<>());
        this.setPermutasOfertadas(new ArrayList<>());
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Bien getBien() {
        return this.bien;
    }

    public void setBien(Bien bien) {
        this.bien = bien;
    }

    public List<Permuta> getPermutasSolicitadas() {
        return this.permutasSolicitadas;
    }

    public void setPermutasSolicitadas(List<Permuta> permutasSolicitadas) {
        this.permutasSolicitadas = permutasSolicitadas;
    }

    public List<Permuta> getPermutasOfertadas() {
        return this.permutasOfertadas;
    }

    public void setPermutasOfertadas(List<Permuta> permutasOfertadas) {
        this.permutasOfertadas = permutasOfertadas;
    }

    public void addPermutaSolicitada(Permuta permuta) {
        if (permuta != null) {
            List<Permuta> permutas = this.getPermutasSolicitadas();
            if (!permutas.contains(permuta)) {
                permutas.add(permuta);
                permuta.setSolicitada(this);
            }
        }
    }

    public void removePermutaSolicitada(Permuta permuta) {
        this.getPermutasSolicitadas().remove(permuta);
    }

    public void addPermutaOfertada(Permuta permuta) {
        if (permuta != null) {
            List<Permuta> permutas = this.getPermutasOfertadas();
            if (!permutas.contains(permuta)) {
                permutas.add(permuta);
                permuta.setOfertada(this);
            }
        }
    }

    public void removePermutaOfertada(Permuta permuta) {
        this.getPermutasOfertadas().remove(permuta);
    }
    
    public boolean isUsuarioHabilitado() {
    	return this.bien.getTitular().isHabilitadaIntercambio();
    }
    
    public boolean isBienHabilitado() {
    	return this.bien.isHabilitadoIntercambio();
    }
}
