package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.BienAeronautico;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface BienAeronauticoService {
    BienAeronautico getById(Long id);

    Publicacion publicarAeronautico(BienAeronautico aeronautico, String titulo, String descripcion);
}
