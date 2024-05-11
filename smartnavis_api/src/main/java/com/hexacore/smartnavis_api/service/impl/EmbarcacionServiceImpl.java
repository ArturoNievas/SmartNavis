package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class EmbarcacionServiceImpl implements EmbarcacionService {
    @Autowired
    private EmbarcacionRepository repository;

    @Autowired
    private PublicacionService publicacionService;

    @Override
    public Embarcacion getById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new NotFoundException("La embarcación no existe."));
    }

    @Override
    public Publicacion publicarEmbarcacion(Embarcacion embarcacion, String titulo, String descripcion) {
        if (!embarcacion.isHabilitadoIntercambio()) {
            throw new BadRequestException("La embarcación no está habilitada para intercambio.");
        }
        if (!embarcacion.getTitular().isHabilitadaIntercambio()) {
            throw new BadRequestException("El titular de la embarcación no está habilitado para intercambio.");
        }
        Optional<Publicacion> opPub = this.publicacionService.findByEmbarcacion(embarcacion);
        if (opPub.isPresent()) {
            throw new BadRequestException("La embarcación ya se encuentra publicada.");
        }
        return this.publicacionService.crear(titulo, descripcion, embarcacion);
    }
}
