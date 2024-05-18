package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.service.PersonaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/persona")
public class PersonaController extends SmartNavisController<Persona, Long> {
    // private final PersonaService service;

    public PersonaController(PersonaService service) {
        super(service);
        // this.service = service;
    }
}
