package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.AmarraRepository;
import com.hexacore.smartnavis_api.service.AmarraService;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AmarraServiceImpl extends SmartNavisServiceImpl<Amarra, Long> implements AmarraService {
    private final AmarraRepository repository;

    public AmarraServiceImpl(AmarraRepository repository) {
        super(repository);
        this.repository = repository;
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
}
