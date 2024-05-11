package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.Optional;

public interface PublicacionService {
    Optional<Publicacion> findByEmbarcacion(Embarcacion embarcacion);

    Publicacion crear(String titulo, String descripcion, Embarcacion embarcacion);
}
