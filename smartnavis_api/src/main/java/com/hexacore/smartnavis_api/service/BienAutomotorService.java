package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienAutomotor;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienAutomotorService {
    BienAutomotor getById(Long id);

    Publicacion publicarAutomotor(BienAutomotor automotor, String titulo, String descripcion);
}
