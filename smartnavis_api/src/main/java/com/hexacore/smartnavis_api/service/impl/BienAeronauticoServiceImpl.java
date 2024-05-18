package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.BienAeronautico;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienAeronauticoRepository;
import com.hexacore.smartnavis_api.service.BienAeronauticoService;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BienAeronauticoServiceImpl extends SmartNavisServiceImpl<BienAeronautico, Long> implements BienAeronauticoService {
    private final BienService bienService;

    public BienAeronauticoServiceImpl(BienAeronauticoRepository repository, BienService bienService) {
        super(repository);
        this.bienService = bienService;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El aeronáutico no existe.");
    }


    @Override
    public Publicacion publicar(BienAeronautico aeronautico, String titulo, String descripcion) {
        return this.bienService.publicar(aeronautico, titulo, descripcion);
    }
}
