package com.hexacore.smartnavis_api.controller.input;

public class AlquilerTitularRequest {
	
	private CrearEmbarcacionInput embarcacion;
	private Long titularId;
	
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
	
}
