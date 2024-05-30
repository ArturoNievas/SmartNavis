package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.AmarraRepository;
import com.hexacore.smartnavis_api.service.AmarraService;
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
	public Iterable<Amarra> listarAmarras(Puerto puerto) {
		return this.repository.findByPuerto(puerto);
	}

	@Override
	public Iterable<Amarra> listarAmarrasDisponibles(Puerto puerto, Double eslora, Double manga, Double calado) {
		return this.repository.buscarDisponiblesPorPuerto(puerto,eslora,manga,calado);
	}
}
