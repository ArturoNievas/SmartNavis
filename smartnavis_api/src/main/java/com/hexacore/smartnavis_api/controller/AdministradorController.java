package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.service.AdministradorService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/administrador")
public class AdministradorController extends SmartNavisController<Administrador, Long> {
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        super(administradorService);
        this.administradorService = administradorService;
    }

    @PostMapping("{id}/degradar")
    public Usuario degradarAdministrador(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return this.administradorService.degradarAdministrador(
                this.administradorService.obtenerAdministradorPorUsername(userDetails.getUsername()),
                this.administradorService.getMustExist(id));
    }
}
