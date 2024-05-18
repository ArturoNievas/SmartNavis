package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;

public interface PermutaService extends SmartNavisService<Permuta, Long> {
    Permuta aceptar(Permuta permuta);
    
    Permuta crear(Publicacion solicitada, Publicacion ofertada);
}
