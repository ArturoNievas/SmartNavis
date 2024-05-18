package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/usuario")
public class UsuarioController extends SmartNavisController<Usuario, Long> {
    // private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        super(service);
        // this.service = service;
    }
}
