package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;

public interface EmbarcacionService extends SmartNavisService<Embarcacion, Long> {
    Publicacion publicar(Embarcacion embarcacion, String titulo, String descripcion);

    Iterable<Embarcacion> buscarPorUsuario(Usuario usuario);
}
