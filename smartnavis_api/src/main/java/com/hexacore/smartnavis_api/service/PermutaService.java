package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Permuta;

public interface PermutaService extends SmartNavisService<Permuta, Long> {
    Permuta aceptar(Permuta permuta);
}
