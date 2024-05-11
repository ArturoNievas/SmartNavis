package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.service.BienService;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmbarcacionServiceImpl implements EmbarcacionService {
    @Autowired
    private EmbarcacionRepository repository;

    @Autowired
    private BienService bienService;

    @Override
    public Embarcacion getById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new NotFoundException("La embarcación no existe."));
    }

    @Override
    public Publicacion publicarEmbarcacion(Embarcacion embarcacion, String titulo, String descripcion) {
        return this.bienService.publicarBien(embarcacion, titulo, descripcion);
    }
}
