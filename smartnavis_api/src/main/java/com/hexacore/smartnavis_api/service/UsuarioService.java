package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;

import java.util.Optional;

public interface UsuarioService {
    Optional<Usuario> findByPersona(Persona persona);
}
