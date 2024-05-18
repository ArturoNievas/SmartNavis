package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Puerto;

public interface PuertoService extends SmartNavisService<Puerto, Long> {
    Iterable<Puerto> buscarPorNombre(String nombre);
}
