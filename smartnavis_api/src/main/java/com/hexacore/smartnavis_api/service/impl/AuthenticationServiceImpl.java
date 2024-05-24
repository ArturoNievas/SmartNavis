package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.UnauthorizedException;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.security.JwtAuthenticationResponse;
import com.hexacore.smartnavis_api.security.Role;
import com.hexacore.smartnavis_api.service.AuthenticationService;
import com.hexacore.smartnavis_api.service.JwtService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UsuarioRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(UsuarioRepository repository, JwtService jwtService,
                                     AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public JwtAuthenticationResponse registrarUsuario(int dni, String nombres, String apellidos, Date fechaNacimiento,
                                                      String username, String password) {
        try {
            return new JwtAuthenticationResponse(jwtService.generateToken(this.repository.save(new Usuario(dni, nombres,
                    apellidos, fechaNacimiento, username, password, Role.USUARIO))));
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("La persona y/o el usuario ya existen.");
        }
    }

    @Override
    public JwtAuthenticationResponse iniciarSesion(String username, String password) {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Credenciales incorrectas.");
        }
        return new JwtAuthenticationResponse(this.jwtService.generateToken(this.repository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("Credenciales incorrectas."))));
    }
}
