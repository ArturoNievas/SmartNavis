package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.DisponibilidadAmarra;
import com.hexacore.smartnavis_api.service.DisponibilidadAmarraService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/disponibilidad-amarra")
public class DisponibilidadAmarraController extends SmartNavisController<DisponibilidadAmarra, Long> {
    // private final DisponibilidadAmarraService service;

    public DisponibilidadAmarraController(DisponibilidadAmarraService service) {
        super(service);
        // this.service = service;
    }
}
