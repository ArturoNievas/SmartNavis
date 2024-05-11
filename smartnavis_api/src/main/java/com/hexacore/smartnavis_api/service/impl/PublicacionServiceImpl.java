package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.PublicacionRepository;
import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PublicacionServiceImpl implements PublicacionService {
    @Autowired
    private PublicacionRepository repository;

    @Override
    public Optional<Publicacion> findByBien(Bien bien) {
        return this.repository.findByBien(bien);
    }

    @Override
    public Optional<Publicacion> findByEmbarcacion(Embarcacion embarcacion) {
        return this.findByBien(embarcacion);
    }

    @Override
    public Publicacion crear(String titulo, String descripcion, Bien bien) {
        return this.repository.save(new Publicacion(titulo, descripcion, bien));
    }
}
