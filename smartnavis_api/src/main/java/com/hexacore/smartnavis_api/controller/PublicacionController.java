package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

import com.hexacore.smartnavis_api.service.AdministradorService;
import com.hexacore.smartnavis_api.service.PermutaService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.hexacore.smartnavis_api.controller.input.CrearPermutaInput;
import com.hexacore.smartnavis_api.model.*;

@RestController
@RequestMapping("api/publicacion")
public class PublicacionController extends SmartNavisController<Publicacion, Long> {
    private final PublicacionService service;
    private final PermutaService permutaService;
    private final UsuarioService usuarioService;
    private final AdministradorService administradorService;

    public PublicacionController(PublicacionService service, PermutaService permutaService, UsuarioService usuarioService,
                                 AdministradorService administradorService) {
        super(service);
        this.service = service;
        this.permutaService = permutaService;
        this.usuarioService = usuarioService;
        this.administradorService = administradorService;
    }

    @GetMapping("embarcacion")
    public Iterable<Publicacion> listarEmbarcaciones() {
        return this.service.buscarPorTipo(Embarcacion.class);
    }

    @PostMapping("{id}/solicitar")
    public Permuta solicitar(@PathVariable("id") Long id, @RequestBody CrearPermutaInput input) {
        return this.service.solicitar(this.service.getMustExist(id), this.service.getMustExist(input.getOfertadaId()));
    }

    @GetMapping("{id}/solicitudes")
    public Iterable<Permuta> listarSolicitudes(@PathVariable("id") Long id) {
        return this.permutaService.listarSolicitudes(this.service.getMustExist(id));
    }

    @Override
    protected Publicacion updateMapper(Publicacion publicacion, Publicacion nuevaPublicacion) {
        publicacion.setDescripcion(nuevaPublicacion.getDescripcion());
        publicacion.setTitulo(nuevaPublicacion.getTitulo());
        return publicacion;
    }

    @Override
    protected boolean canUpdate(Publicacion publicacion, UserDetails userDetails) {
        return this.administradorService.buscarPorUsername(userDetails.getUsername()).isPresent() ||
                (publicacion.getBien().getTitular().getDni() == this.usuarioService
                        .buscarPorUsernameSeguroExiste(userDetails.getUsername()).getDni());
    }

    @Override
    protected boolean canDelete(Publicacion publicacion, UserDetails userDetails) {
        return this.administradorService.buscarPorUsername(userDetails.getUsername()).isPresent() ||
                (publicacion.getBien().getTitular().getDni() == this.usuarioService
                        .buscarPorUsernameSeguroExiste(userDetails.getUsername()).getDni());
    }

    @GetMapping("me")
    public Iterable<Publicacion> listarMisPublicaciones(@AuthenticationPrincipal UserDetails userDetails) {
        return this.service.buscarPorUsuario(this.usuarioService.buscarPorUsernameSeguroExiste(userDetails.getUsername()));
    }
}
