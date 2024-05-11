package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.CrearPublicacionInput;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.service.BienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BienController {
    @Autowired
    private BienService service;

    @PostMapping("/bien/{id}/publicar")
    public Publicacion publicarBien(@PathVariable("id") Long id, @RequestBody CrearPublicacionInput input) {
        return this.service.publicarBien(this.service.getMustExist(id), input.getTitulo(), input.getDescripcion());
    }
}
