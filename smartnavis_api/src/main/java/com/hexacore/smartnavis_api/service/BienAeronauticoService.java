package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienAeronautico;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienAeronauticoService extends SmartNavisService<BienAeronautico, Long> {
    Publicacion publicar(BienAeronautico aeronautico, String titulo, String descripcion);
}
