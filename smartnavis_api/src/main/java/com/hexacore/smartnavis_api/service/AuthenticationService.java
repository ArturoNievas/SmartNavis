package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.security.JwtAuthenticationResponse;

import java.util.Date;

public interface AuthenticationService {
    JwtAuthenticationResponse registrarUsuario(int dni, String nombres, String apellidos, Date fechaNacimiento,
                                               String username, String password);

    JwtAuthenticationResponse iniciarSesion(String username, String password);

    Usuario me(String username);
}
