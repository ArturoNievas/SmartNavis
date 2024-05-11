package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface EmbarcacionService {
    Embarcacion getById(Long id);

    Publicacion publicarEmbarcacion(Embarcacion embarcacion, String titulo, String descripcion);
}
