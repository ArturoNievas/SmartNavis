package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.repository.AlquilerTerceroRepository;
import com.hexacore.smartnavis_api.service.AlquilerService;
import com.hexacore.smartnavis_api.service.AmarraService;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import com.hexacore.smartnavis_api.service.UsuarioService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlquilerServiceImpl extends SmartNavisServiceImpl<Alquiler, Long> implements AlquilerService {
    private final AlquilerRepository repository;
    private final AlquilerTerceroRepository terceroRepository;
	private final EmbarcacionService embarcacionService;
	private final UsuarioService usuarioService;
	private final AmarraService amarraService;
	

    public AlquilerServiceImpl(AlquilerRepository repository, EmbarcacionService embarcacionService, UsuarioService usuarioService, AmarraService amarraService, AlquilerTerceroRepository terceroRepository) {
    	super(repository);
		this.terceroRepository = terceroRepository;
    	this.embarcacionService = embarcacionService;
        this.repository = repository;
		this.usuarioService = usuarioService;
		this.amarraService = amarraService;
    }

	@Override
	public Alquiler alquilarTitular(Long amarraId, CrearEmbarcacionInput embarcacion, Long titularId) {
		
		Embarcacion embarcacion1 = this.embarcacionService.registrarEmbarcacion(embarcacion, this.usuarioService.getMustExist(titularId));
		
		Amarra amarra = this.amarraService.toggleDisponible(this.amarraService.getMustExist(amarraId));

		return this.persist(new Alquiler(amarra,embarcacion1));
	}

}
