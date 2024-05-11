package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.BienAutomotor;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienAutomotorRepository;
import com.hexacore.smartnavis_api.service.BienAutomotorService;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BienAutomotorServiceImpl extends SmartNavisServiceImpl<BienAutomotor, Long> implements BienAutomotorService {
    private final BienService bienService;

    public BienAutomotorServiceImpl(BienAutomotorRepository repository, BienService bienService) {
        super(repository);
        this.bienService = bienService;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El automotor no existe.");
    }


    @Override
    public Publicacion publicarAutomotor(BienAutomotor automotor, String titulo, String descripcion) {
        return this.bienService.publicarBien(automotor, titulo, descripcion);
    }
}
