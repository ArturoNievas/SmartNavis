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
    private final UsuarioService usurioService;
    private final PublicacionService publicacionService;
    private final EmbarcacionService embarcacionService;

    public UsuarioController(UsuarioService usurioService, PublicacionService publicacionService,
                             EmbarcacionService embarcacionService) {
        super(usurioService);
        this.usurioService = usurioService;
        this.publicacionService = publicacionService;
        this.embarcacionService = embarcacionService;
    }

    @GetMapping("{id}/publicacion")
    public Iterable<Publicacion> listarPublicaciones(@PathVariable Long id) {
        return this.publicacionService.buscarPorUsuario(this.usurioService.getMustExist(id));
    }

    @GetMapping("{id}/embarcacion")
    public Iterable<Embarcacion> listarEmbarcaciones(@PathVariable Long id) {
        return this.embarcacionService.buscarPorUsuario(this.usurioService.getMustExist(id));
    }

    @PostMapping("{id}/promover")
    public Administrador promoverAdministrador(@PathVariable Long id) {
        return this.usurioService.promoverAdministrador(this.usurioService.getMustExist(id));
    }
}
