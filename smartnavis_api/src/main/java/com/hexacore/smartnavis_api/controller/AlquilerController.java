package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.service.AlquilerService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/alquiler")
public class AlquilerController extends SmartNavisController<Alquiler, Long> {
    // private final AlquilerService service;

    public AlquilerController(AlquilerService service) {
        super(service);
        // this.service = service;
    }
    
}
