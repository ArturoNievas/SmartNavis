package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.EmbarcacionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"api/embarcacion", "api/bien/embarcacion"})
public class EmbarcacionController extends SmartNavisController<Embarcacion, Long> {
    private final EmbarcacionService service;

    public EmbarcacionController(EmbarcacionService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/publicar")
    public Publicacion publicar(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicar(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
