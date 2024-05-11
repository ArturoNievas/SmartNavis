package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienInmuebleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienInmuebleController {
    @Autowired
    private BienInmuebleService service;

    @PostMapping("/bien/inmueble/{id}/publicar")
    public Publicacion publicarInmueble(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarInmueble(this.service.getById(id), input.getTitulo(), input.getDescripcion());
    }
}
