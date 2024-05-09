package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "puertos")
public class Puerto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Transient // TODO: quitar cuando se mapee Amarra.
    private List<Amarra> amarras;

    public Puerto() {
        this.setAmarras(new ArrayList<>());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Amarra> getAmarras() {
        return amarras;
    }

    public void setAmarras(List<Amarra> amarras) {
        this.amarras = amarras;
    }
}
