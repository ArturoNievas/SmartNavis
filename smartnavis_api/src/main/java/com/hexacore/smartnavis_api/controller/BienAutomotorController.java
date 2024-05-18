package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.BienAutomotor;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienAutomotorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bien/automotor")
public class BienAutomotorController extends SmartNavisController<BienAutomotor, Long> {
    private final BienAutomotorService service;

    public BienAutomotorController(BienAutomotorService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/publicar")
    public Publicacion publicar(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicar(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
