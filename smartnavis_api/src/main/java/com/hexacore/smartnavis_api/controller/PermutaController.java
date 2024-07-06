package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.service.PermutaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/permuta")
public class PermutaController extends SmartNavisController<Permuta, Long> {
    private final PermutaService service;

    public PermutaController(PermutaService service) {
        super(service);
        this.service = service;
    }

    @PostMapping("{id}/aceptar")
    public Permuta aceptar(@PathVariable("id") Long id) {
        return this.service.aceptar(this.service.getMustExist(id));
    }
    
    @PostMapping("{id}/registrar")
    public Permuta registrar(@PathVariable("id") Long id) {
        return this.service.registrar(this.service.getMustExist(id));
    }
}
