package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Usuario;

public interface AdministradorService extends SmartNavisService<Administrador, Long> {
    Administrador obtenerAdministradorPorUsername(String username);

    Usuario degradarAdministrador(Administrador solicitante, Administrador degradado);
}
