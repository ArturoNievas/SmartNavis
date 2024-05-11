package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.PublicarEmbarcacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmbarcacionController {
    @Autowired
    private EmbarcacionService service;

    @PostMapping("/embarcacion/{id}/publicar")
    public Publicacion publicarEmbarcacion(@PathVariable("id") Long id, @RequestBody PublicarEmbarcacionInput input) {
        return this.service.publicarEmbarcacion(this.service.getById(id), input.getTitulo(), input.getDescripcion());
    }
}
