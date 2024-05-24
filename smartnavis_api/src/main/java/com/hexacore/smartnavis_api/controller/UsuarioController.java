package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController extends SmartNavisController<Usuario, Long> {
    private final UsuarioService service;
    private final PublicacionService publicacionService;
    private final EmbarcacionService embarcacionService;

    public UsuarioController(UsuarioService service, PublicacionService publicacionService,
                             EmbarcacionService embarcacionService) {
        super(service);
        this.service = service;
        this.publicacionService = publicacionService;
        this.embarcacionService = embarcacionService;
    }

    @GetMapping("{id}/publicacion")
    public Iterable<Publicacion> listarPublicaciones(@PathVariable Long id) {
        return this.publicacionService.buscarPorUsuario(this.service.getMustExist(id));
    }

    @GetMapping("{id}/embarcacion")
    public Iterable<Embarcacion> listarEmbarcaciones(@PathVariable Long id) {
        return this.embarcacionService.buscarPorUsuario(this.service.getMustExist(id));
    }

    @PostMapping("{id}/promover")
    public Administrador promoverAdministrador(@PathVariable Long id) {
        return this.service.promoverAdministrador(this.service.getMustExist(id));
    }
}
