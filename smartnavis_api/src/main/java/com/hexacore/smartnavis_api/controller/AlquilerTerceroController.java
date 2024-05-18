package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.service.AlquilerTerceroService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/alquiler/tercero")
public class AlquilerTerceroController extends SmartNavisController<AlquilerTercero, Long> {
    // private final AlquilerTerceroService service;

    public AlquilerTerceroController(AlquilerTerceroService service) {
        super(service);
        // this.service = service;
    }
}
