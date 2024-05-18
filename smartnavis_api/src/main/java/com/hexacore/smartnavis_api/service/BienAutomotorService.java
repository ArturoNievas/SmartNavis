package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienAutomotor;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienAutomotorService extends SmartNavisService<BienAutomotor, Long> {
    Publicacion publicar(BienAutomotor automotor, String titulo, String descripcion);
}
