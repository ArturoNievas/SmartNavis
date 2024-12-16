package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.controller.input.CrearPersonaInput;
import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.repository.AlquilerTerceroRepository;
import com.hexacore.smartnavis_api.service.AlquilerTerceroService;
import com.hexacore.smartnavis_api.service.AmarraService;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import com.hexacore.smartnavis_api.service.PersonaService;
import com.hexacore.smartnavis_api.service.UsuarioService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlquilerTerceroServiceImpl extends SmartNavisServiceImpl<AlquilerTercero, Long>
        implements AlquilerTerceroService {
    private final AlquilerTerceroRepository repository;
    private final AlquilerRepository titularRepository;
	private final EmbarcacionService embarcacionService;
	private final UsuarioService usuarioService;
	private final PersonaService personaService;
	private final AmarraService amarraService;

    public AlquilerTerceroServiceImpl(AlquilerTerceroRepository repository, UsuarioService usuarioService, AlquilerRepository titularRepository, EmbarcacionService embarcacionService, AmarraService amarraService, PersonaService personaService) {
        super(repository);
        this.repository = repository;
		this.titularRepository = titularRepository;
		this.embarcacionService = embarcacionService;
		this.usuarioService = usuarioService;
		this.personaService = personaService;
		this.amarraService = amarraService;
    }

	@Override
	public Alquiler alquilarTercero(Long amarraId, CrearEmbarcacionInput embarcacion, Long titularId,
			CrearPersonaInput duenio, String parentezco) {
		
		Persona duenio1 = this.personaService.registrarPersona(duenio);	
		
		Embarcacion embarcacion1 = this.embarcacionService.registrarEmbarcacion(embarcacion, duenio1);
		
		Amarra amarra = this.amarraService.toggleDisponible(this.amarraService.getMustExist(amarraId));

		return this.persist(new AlquilerTercero(amarra,embarcacion1,this.usuarioService.getMustExist(titularId),parentezco));
	}
}
