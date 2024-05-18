package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.service.AdministradorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/administrador")
public class AdministradorController extends SmartNavisController<Administrador, Long> {
    // private final AdministradorService service;

    public AdministradorController(AdministradorService service) {
        super(service);
        // this.service = service;
    }
}
