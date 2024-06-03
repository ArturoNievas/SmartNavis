package com.hexacore.smartnavis_api.controller.input;

public class CrearEmbarcacionInput {

	private String matricula;

    private String nombre;

    private double eslora;

    private double calado;

    private double manga;

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getEslora() {
		return eslora;
	}

	public void setEslora(double eslora) {
		this.eslora = eslora;
	}

	public double getCalado() {
		return calado;
	}

	public void setCalado(double calado) {
		this.calado = calado;
	}

	public double getManga() {
		return manga;
	}

	public void setManga(double manga) {
		this.manga = manga;
	}
    
    
}
