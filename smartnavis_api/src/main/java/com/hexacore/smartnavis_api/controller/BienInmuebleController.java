package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienInmuebleService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienInmuebleController {
    private final BienInmuebleService service;

    public BienInmuebleController(BienInmuebleService service) {
        this.service = service;
    }

    @PostMapping("/bien/inmueble/{id}/publicar")
    public Publicacion publicarInmueble(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarInmueble(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
