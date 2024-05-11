package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface EmbarcacionService extends SmartNavisService<Embarcacion, Long> {
    Publicacion publicarEmbarcacion(Embarcacion embarcacion, String titulo, String descripcion);
}
