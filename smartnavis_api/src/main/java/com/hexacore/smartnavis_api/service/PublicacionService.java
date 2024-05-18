package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.List;
import java.util.Optional;

public interface PublicacionService extends SmartNavisService<Publicacion, Long> {
    Optional<Publicacion> buscarPorBien(Bien bien);

    Optional<Publicacion> buscarPorEmbarcacion(Embarcacion embarcacion);

    Publicacion crear(String titulo, String descripcion, Bien bien);
    
    List<Publicacion> buscarPorTipo(Class<? extends Bien> tipo);
    
    Permuta solicitar(Publicacion solicitada, Publicacion ofertada);
}
