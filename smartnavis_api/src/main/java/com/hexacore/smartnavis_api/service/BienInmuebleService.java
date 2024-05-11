package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienInmueble;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienInmuebleService {
    BienInmueble getById(Long id);

    Publicacion publicarInmueble(BienInmueble inmueble, String titulo, String descripcion);
}
