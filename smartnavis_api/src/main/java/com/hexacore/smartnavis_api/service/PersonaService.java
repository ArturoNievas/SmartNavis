package com.hexacore.smartnavis_api.service;

import java.util.Optional;

import com.hexacore.smartnavis_api.controller.input.CrearPersonaInput;
import com.hexacore.smartnavis_api.model.Persona;

public interface PersonaService extends SmartNavisService<Persona, Long> {

	Optional<Persona> findByDni(int dni);
	
	Persona registrarPersona(CrearPersonaInput persona);
}
