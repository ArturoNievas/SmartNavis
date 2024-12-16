package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.exception.UnauthorizedException;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.PersonaRepository;
import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.security.JwtAuthenticationResponse;
import com.hexacore.smartnavis_api.security.Role;
import com.hexacore.smartnavis_api.service.AuthenticationService;
import com.hexacore.smartnavis_api.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UsuarioRepository usuarioRepository;
    private final PersonaRepository personaRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(UsuarioRepository usuarioRepository, JwtService jwtService,
                                     AuthenticationManager authenticationManager, PersonaRepository personaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.personaRepository = personaRepository;
    }

    @Override
    @Transactional
    public JwtAuthenticationResponse registrarUsuario(int dni, String nombres, String apellidos, Date fechaNacimiento,
                                                      String username, String password) {
        long age = LocalDate.from(LocalDate.ofInstant(fechaNacimiento.toInstant(), ZoneId.systemDefault()))
                .until(LocalDate.now(), ChronoUnit.YEARS);
        if (age < 18) {
            throw new BadRequestException("La persona debe ser mayor de edad.");
        }

        Optional<Usuario> usuarioOp = this.usuarioRepository.findByUsername(username);
        if (usuarioOp.isPresent()) {
            throw new BadRequestException("El usuario ya existe.");
        }

        Usuario usuario;
        Optional<Persona> personaOp = this.personaRepository.findByDni(dni);
        if (personaOp.isPresent()) {
            Persona persona = personaOp.get();

            usuarioOp = this.usuarioRepository.findById(persona.getId());
            if (usuarioOp.isPresent()) {
                throw new BadRequestException("El DNI ya se se encuentra asociado a un usuario.");
            }

            persona.setNombres(nombres);
            persona.setApellidos(apellidos);
            persona.setFechaNacimiento(fechaNacimiento);
            this.personaRepository.save(persona);
            this.usuarioRepository.addUserToPersona(persona.getId(), username, password, Role.USUARIO.toString());

            usuario = this.usuarioRepository.findById(persona.getId()).orElseThrow();
        } else {
            usuario = this.usuarioRepository.save(new Usuario(dni, nombres, apellidos, fechaNacimiento, username,
                    password, Role.USUARIO));
        }
        return new JwtAuthenticationResponse(jwtService.generateToken(usuario));
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
