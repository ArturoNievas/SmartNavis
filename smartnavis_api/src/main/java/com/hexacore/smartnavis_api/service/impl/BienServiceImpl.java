package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienRepository;
import com.hexacore.smartnavis_api.service.BienService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class BienServiceImpl extends SmartNavisServiceImpl<Bien, Long> implements BienService {
    private final PublicacionService publicacionService;

    public BienServiceImpl(BienRepository repository, PublicacionService publicacionService) {
        super(repository);
        this.publicacionService = publicacionService;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El bien no existe.");
    }


    @Override
    public Publicacion publicar(Bien bien, String titulo, String descripcion) {
        if (!bien.isHabilitadoIntercambio()) {
            throw new BadRequestException("El bien no está habilitado para intercambio.");
        }
        if (!bien.getTitular().isHabilitadaIntercambio()) {
            throw new BadRequestException("El titular del bien no está habilitado para intercambio.");
        }
        Optional<Publicacion> opPub = this.publicacionService.buscarPorBien(bien);
        if (opPub.isPresent()) {
            throw new BadRequestException("El bien ya se encuentra publicado.");
        }
        return this.publicacionService.crear(titulo, descripcion, bien);
    }
}
