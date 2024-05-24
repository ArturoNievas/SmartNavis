package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.IniciarSesionInput;
import com.hexacore.smartnavis_api.controller.input.RegistrarUsuarioInput;
import com.hexacore.smartnavis_api.exception.UnauthorizedException;
import com.hexacore.smartnavis_api.security.JwtAuthenticationResponse;
import com.hexacore.smartnavis_api.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthenticationService service;

    public AuthController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody RegistrarUsuarioInput input) {
        return ResponseEntity.ok(this.service.registrarUsuario(input.getDni(), input.getNombres(), input.getApellidos(),
                input.getFechaNacimiento(), input.getUsername(), input.getPassword()));
    }

    @PostMapping("login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody IniciarSesionInput input) {
        try {
            return ResponseEntity.ok(this.service.iniciarSesion(input.getUsername(), input.getPassword()));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED.value()).build();
        }
    }
}
