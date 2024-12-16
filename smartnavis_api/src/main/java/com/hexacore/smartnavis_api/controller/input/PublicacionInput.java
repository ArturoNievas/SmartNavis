package com.hexacore.smartnavis_api.controller.input;

public class PublicacionInput {

	private String titulo;
    private String descripcion;
    private BienInput bien;

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

	public BienInput getBien() {
		return bien;
	}

	public void setBien(BienInput bien) {
		this.bien = bien;
	}
}
