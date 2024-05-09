package com.hexacore.smartnavis_api.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Persona {
    private int dni;
    private String nombres;
    private String apellidos;
    private Date fechaNacimiento;
    private List<Bien> bienes;

    public Persona() {
        this.setBienes(new ArrayList<>());
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
}
