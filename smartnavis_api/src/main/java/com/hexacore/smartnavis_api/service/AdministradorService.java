package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Usuario;

import java.util.Optional;

public interface AdministradorService extends SmartNavisService<Administrador, Long> {
    Administrador obtenerAdministradorPorUsername(String username);

    Optional<Administrador> buscarPorUsername(String username);

    Usuario degradarAdministrador(Administrador solicitante, Administrador degradado);
}
