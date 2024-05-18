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
}