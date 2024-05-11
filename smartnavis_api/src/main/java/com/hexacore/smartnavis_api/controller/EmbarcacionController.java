package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmbarcacionController {
    private final EmbarcacionService service;

    public EmbarcacionController(EmbarcacionService service) {
        this.service = service;
    }

    @PostMapping("/embarcacion/{id}/publicar")
    public Publicacion publicarEmbarcacion(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarEmbarcacion(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
