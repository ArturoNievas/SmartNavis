package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Mensaje;
import com.hexacore.smartnavis_api.service.MensajeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mensaje")
public class MensajeController extends SmartNavisController<Mensaje, Long> {
    // private final MensajeService service;

    public MensajeController(MensajeService service) {
        super(service);
        // this.service = service;
    }
}
