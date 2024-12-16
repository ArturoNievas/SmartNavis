package com.hexacore.smartnavis_api.controller.input;

public class AlquilerTerceroRequest {

	private CrearEmbarcacionInput embarcacion;
	private Long titularId;
	private CrearPersonaInput duenio;
	private String parentezco;
	
	public CrearEmbarcacionInput getEmbarcacion() {
		return embarcacion;
	}
	public void setEmbarcacion(CrearEmbarcacionInput embarcacion) {
		this.embarcacion = embarcacion;
	}
	public Long getTitularId() {
		return titularId;
	}
	public void setTitularId(Long titularId) {
		this.titularId = titularId;
	}
	public CrearPersonaInput getDuenio() {
		return duenio;
	}
	public void setDuenio(CrearPersonaInput duenio) {
		this.duenio = duenio;
	}
	public String getParentezco() {
		return parentezco;
	}
	public void setParentezco(String parentezco) {
		this.parentezco = parentezco;
	}
	
	
}
