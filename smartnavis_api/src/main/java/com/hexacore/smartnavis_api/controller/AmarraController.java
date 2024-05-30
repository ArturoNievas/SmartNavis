package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.service.AmarraService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/amarra")
public class AmarraController extends SmartNavisController<Amarra, Long> {
    // private final AmarraService service;

    public AmarraController(AmarraService service) {
        super(service);
        // this.service = service;
    }
    
    @Override
    protected Amarra updateMapper(Amarra amarra, Amarra nuevaAmarra) {
        amarra.setCalado(nuevaAmarra.getCalado());
        amarra.setEslora(nuevaAmarra.getEslora());
        amarra.setManga(nuevaAmarra.getManga());
        amarra.setNombre(nuevaAmarra.getNombre());
        return amarra;
    }
}
