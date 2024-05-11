package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.BienInmueble;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienInmuebleRepository;
import com.hexacore.smartnavis_api.service.BienInmuebleService;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BienInmuebleServiceImpl extends SmartNavisServiceImpl<BienInmueble, Long> implements BienInmuebleService {
    private final BienService bienService;

    public BienInmuebleServiceImpl(BienInmuebleRepository repository, BienService bienService) {
        super(repository);
        this.bienService = bienService;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El inmueble no existe.");
    }


    @Override
    public Publicacion publicarInmueble(BienInmueble inmueble, String titulo, String descripcion) {
        return this.bienService.publicarBien(inmueble, titulo, descripcion);
    }
}
