package com.hexacore.smartnavis_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "puertos")
public class Puerto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nombre;

    @JsonIgnore
    @OneToMany(mappedBy = "puerto", fetch = FetchType.LAZY)
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

    public void addAmarra(Amarra amarra) {
        if (amarra != null) {
            List<Amarra> amarras = this.getAmarras();
            if (!amarras.contains(amarra)) {
                amarras.add(amarra);
                amarra.setPuerto(this);
            }
        }
    }

    public void removeAmarra(Amarra amarra) {
        this.getAmarras().remove(amarra);
    }
}
