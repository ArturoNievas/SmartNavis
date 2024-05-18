package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.BienAeronautico;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienAeronauticoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bien/aeronautico")
public class BienAeronauticoController extends SmartNavisController<BienAeronautico, Long> {
    private final BienAeronauticoService service;

    public BienAeronauticoController(BienAeronauticoService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/publicar")
    public Publicacion publicar(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicar(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
