package com.hexacore.smartnavis_api.service;

import java.util.Optional;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;

public interface EmbarcacionService extends SmartNavisService<Embarcacion, Long> {
    Publicacion publicar(Embarcacion embarcacion, String titulo, String descripcion);

    Iterable<Embarcacion> buscarPorUsuario(Usuario usuario);
    
    Optional<Embarcacion> findByMatricula(String matricula);
    
    Embarcacion registrarEmbarcacion(CrearEmbarcacionInput embarcacion, Persona duenio);
}
