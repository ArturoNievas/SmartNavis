package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController extends SmartNavisController<Usuario, Long> {
    private final UsuarioService usuarioService;
    private final PublicacionService publicacionService;
    private final EmbarcacionService embarcacionService;

    public UsuarioController(UsuarioService usuarioService, PublicacionService publicacionService,
                             EmbarcacionService embarcacionService) {
        super(usuarioService);
        this.usuarioService = usuarioService;
        this.publicacionService = publicacionService;
        this.embarcacionService = embarcacionService;
    }

    @GetMapping("{id}/publicacion")
    public Iterable<Publicacion> listarPublicaciones(@PathVariable Long id) {
        return this.publicacionService.buscarPorUsuario(this.usuarioService.getMustExist(id));
    }

    @GetMapping("{id}/embarcacion")
    public Iterable<Embarcacion> listarEmbarcaciones(@PathVariable Long id) {
        return this.embarcacionService.buscarPorUsuario(this.usuarioService.getMustExist(id));
    }

    @PostMapping("{id}/promover")
    public Administrador promoverAdministrador(@PathVariable Long id) {
        return this.usuarioService.promoverAdministrador(this.usuarioService.getMustExist(id));
    }
    
    @GetMapping("buscar/dni/{dni}")
    public Iterable<Usuario> buscarUsuarioPorDNI(@PathVariable int dni) {
        return this.usuarioService.buscarPorDNI(dni);
    }
}
