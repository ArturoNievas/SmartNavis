package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;

import java.util.Optional;

public interface UsuarioService extends SmartNavisService<Usuario, Long> {
    Optional<Usuario> buscarPorPersona(Persona persona);

    Iterable<Usuario> buscarPorDNI(int dni);

    Administrador promoverAdministrador(Usuario usuario);

    Usuario buscarPorUsernameSeguroExiste(String username);
}
