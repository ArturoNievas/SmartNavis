package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienService {
    Bien getById(Long id);

    Publicacion publicarBien(Bien bien, String titulo, String descripcion);
}
