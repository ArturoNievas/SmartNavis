package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;

import java.util.Optional;

public interface UsuarioService extends SmartNavisService<Usuario, Long> {
    Optional<Usuario> buscarPorPersona(Persona persona);
}
