package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.Optional;

public interface PublicacionService extends SmartNavisService<Publicacion, Long> {
    Optional<Publicacion> findByBien(Bien bien);

    Optional<Publicacion> findByEmbarcacion(Embarcacion embarcacion);

    Publicacion crearPublicacion(String titulo, String descripcion, Bien bien);
}
