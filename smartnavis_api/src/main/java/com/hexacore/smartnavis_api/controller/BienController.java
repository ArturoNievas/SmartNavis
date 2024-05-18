package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bien")
public class BienController extends SmartNavisController<Bien, Long> {
    private final BienService service;

    public BienController(BienService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/publicar")
    public Publicacion publicar(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicar(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
