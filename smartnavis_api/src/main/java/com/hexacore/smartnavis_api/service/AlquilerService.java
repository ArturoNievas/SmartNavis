package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.Usuario;

public interface AlquilerService extends SmartNavisService<Alquiler, Long> {
    Alquiler alquilarTitular(Long id, CrearEmbarcacionInput embarcacion, Long titularId);

    Iterable<Alquiler> buscarPorUsuario(Usuario usuario);
}
