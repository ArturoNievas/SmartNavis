package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.AlquilerTemporal;
import com.hexacore.smartnavis_api.service.AlquilerTemporalService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/alquiler/temporal")
public class AlquilerTemporalController extends SmartNavisController<AlquilerTemporal, Long> {
    // private final AlquilerTemporalService service;

    public AlquilerTemporalController(AlquilerTemporalService service) {
        super(service);
        // this.service = service;
    }
}
