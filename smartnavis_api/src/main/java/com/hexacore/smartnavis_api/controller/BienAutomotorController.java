package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienAutomotorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienAutomotorController {
    @Autowired
    private BienAutomotorService service;

    @PostMapping("/bien/automotor/{id}/publicar")
    public Publicacion publicarAutomotor(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarAutomotor(this.service.getById(id), input.getTitulo(), input.getDescripcion());
    }
}
