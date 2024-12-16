package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.CrearPersonaInput;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.repository.PersonaRepository;
import com.hexacore.smartnavis_api.service.PersonaService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PersonaServiceImpl extends SmartNavisServiceImpl<Persona, Long> implements PersonaService {
    private final PersonaRepository repository;

    public PersonaServiceImpl(PersonaRepository repository) {
        super(repository);
        this.repository = repository;
    }

	@Override
	public Optional<Persona> findByDni(int dni) {
		return this.repository.findByDni(dni);
	}

	@Override
	public Persona registrarPersona(CrearPersonaInput persona) {
		Persona duenio1;
		Optional<Persona> d = this.findByDni(persona.getDni());
		if (!d.isPresent()) {
			duenio1 = new Persona(persona.getDni(),persona.getNombres(),persona.getApellidos(),persona.getFechaNacimiento());
			this.persist(duenio1);
		} else {
			duenio1 = d.get();
		}	
		return duenio1;
	}
}
