package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienInmueble;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienInmuebleService extends SmartNavisService<BienInmueble, Long> {
    Publicacion publicar(BienInmueble inmueble, String titulo, String descripcion);
}
