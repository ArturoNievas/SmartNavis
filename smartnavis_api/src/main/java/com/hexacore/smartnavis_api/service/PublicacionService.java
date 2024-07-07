package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.controller.input.PublicacionInput;
import com.hexacore.smartnavis_api.model.*;

import java.util.List;
import java.util.Optional;

public interface PublicacionService extends SmartNavisService<Publicacion, Long> {
    Optional<Publicacion> buscarPorBien(Bien bien);

    Optional<Publicacion> buscarPorEmbarcacion(Embarcacion embarcacion);

    Publicacion crear(String titulo, String descripcion, Bien bien);
    
    List<Publicacion> buscarPorTipo(Class<? extends Bien> tipo);
    
    Permuta solicitar(Publicacion solicitada, Publicacion ofertada);

    Iterable<Publicacion> buscarPorUsuario(Usuario usuario);

    Publicacion crearPublicacion(PublicacionInput input, Usuario usuario);
}
