package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.BienInmueble;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienInmuebleService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bien/inmueble")
public class BienInmuebleController extends SmartNavisController<BienInmueble, Long> {
    private final BienInmuebleService service;

    public BienInmuebleController(BienInmuebleService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/publicar")
    public Publicacion publicar(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicar(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
