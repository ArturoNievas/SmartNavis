package com.hexacore.smartnavis_api.controller.input;

public class BienInput {

	private boolean habilitadoIntercambio;
	private String patente;
	private String matricula;
	private String partida;
	
	public boolean isHabilitadoIntercambio() {
		return habilitadoIntercambio;
	}
	public void setHabilitadoIntercambio(boolean habilitadoIntercambio) {
		this.habilitadoIntercambio = habilitadoIntercambio;
	}
	public String getPatente() {
		return patente;
	}
	public void setPatente(String patente) {
		this.patente = patente;
	}
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public String getPartida() {
		return partida;
	}
	public void setPartida(String partida) {
		this.partida = partida;
	}
	
}
