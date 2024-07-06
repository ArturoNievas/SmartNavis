package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.service.PermutaService;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/permuta")
public class PermutaController extends SmartNavisController<Permuta, Long> {
    private final PermutaService permutaService;
    private final UsuarioService usuarioService;

    public PermutaController(PermutaService permutaService, UsuarioService usuarioService) {
        super(permutaService);
        this.permutaService = permutaService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("{id}/aceptar")
    public Permuta aceptar(@PathVariable("id") Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return this.permutaService.aceptar(this.permutaService.getMustExist(id),
                this.usuarioService.buscarPorUsernameSeguroExiste(userDetails.getUsername()));
    }
    
    @PostMapping("{id}/registrar")
    public Permuta registrar(@PathVariable("id") Long id) {
        return this.permutaService.registrar(this.permutaService.getMustExist(id));
    }
}
