package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.service.PuertoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/puerto")
public class PuertoController extends SmartNavisController<Puerto, Long> {
    private final PuertoService service;

    public PuertoController(PuertoService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("{nombre}")
    public Iterable<Puerto> listarPorNombre(@PathVariable("nombre") String nombre) {
        return this.service.buscarPorNombre(nombre);
    }

    @Override
    protected Puerto updateMapper(Puerto puerto, Puerto nuevoPuerto) {
        puerto.setNombre(nuevoPuerto.getNombre());
        return puerto;
    }
}
