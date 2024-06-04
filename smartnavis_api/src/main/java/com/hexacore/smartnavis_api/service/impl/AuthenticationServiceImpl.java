package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService,
                                     AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public JwtAuthenticationResponse registrarUsuario(int dni, String nombres, String apellidos, Date fechaNacimiento,
                                                      String username, String password) {
        long age = LocalDate.from(LocalDate.ofInstant(fechaNacimiento.toInstant(), ZoneId.systemDefault()))
                .until(LocalDate.now(), ChronoUnit.YEARS);
        if (age < 18) {
            throw new BadRequestException("La persona debe ser mayor de edad.");
        }
        try {
            return new JwtAuthenticationResponse(jwtService.generateToken(this.usuarioRepository.save(new Usuario(dni,
                    nombres, apellidos, fechaNacimiento, username, password, Role.USUARIO))));
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
        return new JwtAuthenticationResponse(this.jwtService.generateToken(this.usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("Credenciales incorrectas."))));
    }

    @Override
    public Usuario me(String username) {
        return this.usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado."));
    }
}
