package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

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

    public PublicacionController(PublicacionService service, PermutaService permutaService, UsuarioService usuarioService) {
        super(service);
        this.service = service;
        this.permutaService = permutaService;
        this.usuarioService = usuarioService;
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

    @GetMapping("me")
    public Iterable<Publicacion> listarMisPublicaciones(@AuthenticationPrincipal UserDetails userDetails) {
        return this.service.buscarPorUsuario(this.usuarioService.buscarPorUsernameSeguroExiste(userDetails.getUsername()));
    }
}
