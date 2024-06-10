package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.service.AlquilerService;

import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/alquiler")
public class AlquilerController extends SmartNavisController<Alquiler, Long> {
    private final AlquilerService service;
    private final UsuarioService usuarioService;

    public AlquilerController(AlquilerService service, UsuarioService usuarioService) {
        super(service);
        this.service = service;
        this.usuarioService = usuarioService;
    }

    @GetMapping("")
    public Iterable<Alquiler> listarAlquileres() {
        return this.service.listarAlquiler();
    }

    @GetMapping("me")
    public Iterable<Alquiler> listarMisAlquileres(@AuthenticationPrincipal UserDetails userDetails) {
        return this.service.buscarPorUsuario(this.usuarioService.buscarPorUsernameSeguroExiste(userDetails.getUsername()));
    }

}
