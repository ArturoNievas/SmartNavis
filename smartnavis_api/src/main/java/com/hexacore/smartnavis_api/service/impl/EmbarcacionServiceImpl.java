package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.service.BienService;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmbarcacionServiceImpl extends SmartNavisServiceImpl<Embarcacion, Long> implements EmbarcacionService {
    private final BienService bienService;

    public EmbarcacionServiceImpl(EmbarcacionRepository repository, BienService bienService) {
        super(repository);
        this.bienService = bienService;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("La embarcación no existe.");
    }


    @Override
    public Publicacion publicarEmbarcacion(Embarcacion embarcacion, String titulo, String descripcion) {
        return this.bienService.publicarBien(embarcacion, titulo, descripcion);
    }
}
