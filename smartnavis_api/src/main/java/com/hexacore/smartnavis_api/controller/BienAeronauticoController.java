package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienAeronauticoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienAeronauticoController {
    @Autowired
    private BienAeronauticoService service;

    @PostMapping("/bien/aeronautico/{id}/publicar")
    public Publicacion publicarAeronautico(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarAeronautico(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
