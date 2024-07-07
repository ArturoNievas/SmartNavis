package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.ReAsignarAmarraTerceroInput;
import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.repository.AlquilerTerceroRepository;
import com.hexacore.smartnavis_api.repository.AmarraRepository;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.service.AmarraService;
import com.hexacore.smartnavis_api.service.PersonaService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AmarraServiceImpl extends SmartNavisServiceImpl<Amarra, Long> implements AmarraService {
    private final AmarraRepository repository;
    private final AlquilerRepository alquilerRepository;
    private final AlquilerTerceroRepository alquilerTerceroRepository;
    private final EmbarcacionRepository embarcacionRepository;
    private final PersonaService personaService;

    public AmarraServiceImpl(AmarraRepository repository, AlquilerTerceroRepository alquilerTerceroRepository, AlquilerRepository alquilerRepository, PersonaService personaService, EmbarcacionRepository embarcacionRepository) {
        super(repository);
        this.repository = repository;
		this.alquilerRepository = alquilerRepository;
		this.alquilerTerceroRepository = alquilerTerceroRepository;
		this.embarcacionRepository = embarcacionRepository;
		this.personaService = personaService;
    }
    
    @Override
    public Amarra persist(Amarra amarra) {
        if (this.repository.findByPuertoAndNombre(amarra.getPuerto(),amarra.getNombre()).isPresent()) {
        	throw new BadRequestException("Ya existe una amarra en este puerto con el nombre " + amarra.getNombre());
        } else {
        	return this.repository.save(amarra);
        }
    }

	@Override
	public Iterable<Amarra> listarAmarras(Puerto puerto) {
		return this.repository.findByPuerto(puerto);
	}

	@Override
	public Iterable<Amarra> listarAmarrasDisponibles(Puerto puerto, Double eslora, Double manga, Double calado) {
		return this.repository.buscarDisponiblesPorPuerto(puerto,eslora,manga,calado);
	}

	@Override
	public Amarra toggleDisponible(Amarra amarra) {
		amarra.setDisponible(!amarra.isDisponible());
		return this.repository.save(amarra);
	}

	@Override
	public Alquiler liberarAmarra(Amarra amarra) {
		if (amarra.isDisponible()) {
			throw new BadRequestException("La amarra ya se encuentra disponible");
		}

		Alquiler alquiler = this.alquilerRepository.findVigenteByAmarra(amarra).get();
		alquiler.setFin(LocalDateTime.now());
		this.alquilerRepository.save(alquiler);	
				
		this.toggleDisponible(amarra);
		
		return alquiler;
	}

	@Override
	public Alquiler reAsignarAmarraTitular(Amarra amarra, Long nuevoTitularID) {
		if (amarra.isDisponible()) {
			throw new BadRequestException("No hay ninguna embarcación en la amarra");
		}
		
		Alquiler alquiler = this.alquilerRepository.findVigenteByAmarra(amarra).get();
		Persona nuevoTitular1 = this.personaService.getMustExist(nuevoTitularID);
		
		Embarcacion e = alquiler.getEmbarcacion();
		e.setTitular(nuevoTitular1);
		this.embarcacionRepository.save(e);
		
		return alquiler;
	}

	@Override
	public Alquiler reAsignarAmarraTercero(Amarra amarra, ReAsignarAmarraTerceroInput nuevoTitular) {
		if (amarra.isDisponible()) {
			throw new BadRequestException("No hay ninguna embarcación en la amarra");
		}
		
		AlquilerTercero alquiler = this.alquilerTerceroRepository.findVigenteByAmarra(amarra).get();
		Persona nuevoTitular1 = this.personaService.getMustExist(nuevoTitular.getId());
		
		alquiler.setTitular(nuevoTitular1);
		alquiler.setParentezco(nuevoTitular.getParentezco());
		this.alquilerTerceroRepository.save(alquiler);
				
		return alquiler;
	}
}
