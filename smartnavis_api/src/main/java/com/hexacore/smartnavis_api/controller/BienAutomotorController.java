package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienAutomotorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienAutomotorController {
    private final BienAutomotorService service;

    public BienAutomotorController(BienAutomotorService service) {
        this.service = service;
    }

    @PostMapping("/bien/automotor/{id}/publicar")
    public Publicacion publicarAutomotor(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarAutomotor(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
