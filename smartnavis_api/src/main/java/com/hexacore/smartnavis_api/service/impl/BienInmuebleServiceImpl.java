package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.BienInmueble;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.BienInmuebleRepository;
import com.hexacore.smartnavis_api.service.BienInmuebleService;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BienInmuebleServiceImpl implements BienInmuebleService {
    @Autowired
    private BienInmuebleRepository repository;

    @Autowired
    private BienService bienService;

    @Override
    public BienInmueble getById(Long id) {
        return this.repository.findById(id).orElseThrow(() -> new NotFoundException("El inmueble no existe."));
    }

    @Override
    public Publicacion publicarInmueble(BienInmueble inmueble, String titulo, String descripcion) {
        return this.bienService.publicarBien(inmueble, titulo, descripcion);
    }
}
