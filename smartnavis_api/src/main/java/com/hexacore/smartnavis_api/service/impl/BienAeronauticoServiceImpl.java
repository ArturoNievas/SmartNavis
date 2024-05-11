package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.BienAeronautico;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienAeronauticoRepository;
import com.hexacore.smartnavis_api.service.BienAeronauticoService;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BienAeronauticoServiceImpl implements BienAeronauticoService {
    @Autowired
    private BienAeronauticoRepository repository;

    @Autowired
    private BienService bienService;

    @Override
    public BienAeronautico getById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new NotFoundException("El aeronáutico no existe."));
    }

    @Override
    public Publicacion publicarAeronautico(BienAeronautico aeronautico, String titulo, String descripcion) {
        return this.bienService.publicarBien(aeronautico, titulo, descripcion);
    }
}
