package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "personas")
@Inheritance(strategy = InheritanceType.JOINED)
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private int dni;

    private String nombres;

    private String apellidos;

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @OneToMany(mappedBy = "titular")
    private List<Bien> bienes;

    @OneToMany(mappedBy = "titular")
    private List<AlquilerTercero> alquilerTerceros;

    public Persona() {
        this.setBienes(new ArrayList<>());
        this.setAlquilerTerceros(new ArrayList<>());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDni() {
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public List<Bien> getBienes() {
        return bienes;
    }

    public void setBienes(List<Bien> bienes) {
        this.bienes = bienes;
    }

    public void addBien(Bien bien) {
        if (bien != null) {
            List<Bien> bienes = getBienes();
            if (!bienes.contains(bien)) {
                bienes.add(bien);
                bien.setTitular(this);
            }
        }
    }

    public void removeBien(Bien bien) {
        this.bienes.remove(bien);
    }

    public List<AlquilerTercero> getAlquilerTerceros() {
        return alquilerTerceros;
    }

    public void setAlquilerTerceros(List<AlquilerTercero> alquilerTerceros) {
        this.alquilerTerceros = alquilerTerceros;
    }

    public void addAlquilerTercero(AlquilerTercero alquilerTercero) {
        if (alquilerTercero != null) {
            List<AlquilerTercero> alquileres = getAlquilerTerceros();
            if (!alquileres.contains(alquilerTercero)) {
                alquileres.add(alquilerTercero);
                alquilerTercero.setTitular(this);
            }
        }
    }

    public void removeAlquilerTercero(AlquilerTercero alquilerTercero) {
        this.getAlquilerTerceros().remove(alquilerTercero);
    }
}
