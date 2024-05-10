package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "publicaciones")
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descripcion;

    @OneToOne
    private Bien bien;

    @OneToMany(mappedBy = "solicitada", fetch = FetchType.LAZY)
    private List<Permuta> permutasSolicitadas;

    public Publicacion() {
        this.setPermutasSolicitadas(new ArrayList<>());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Permuta> getPermutasSolicitadas() {
        return permutasSolicitadas;
    }

    public void setPermutasSolicitadas(List<Permuta> permutasSolicitadas) {
        this.permutasSolicitadas = permutasSolicitadas;
    }
}
