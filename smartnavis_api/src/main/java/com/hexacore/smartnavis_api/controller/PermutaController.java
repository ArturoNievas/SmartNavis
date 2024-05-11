package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.service.PermutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PermutaController {
    @Autowired
    private PermutaService service;

    @GetMapping("/permutas")
    public Iterable<Permuta> listarPermutas() {
        return this.service.findAll();
    }

    @PostMapping("/permuta/{id}/aceptar")
    public Permuta aceptarPermuta(@PathVariable("id") Long id) {
        return this.service.aceptarPermuta(this.service.getMustExist(id));
    }
}
