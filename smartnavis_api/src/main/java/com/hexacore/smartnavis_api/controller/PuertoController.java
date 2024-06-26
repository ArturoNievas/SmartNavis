package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.service.AmarraService;
import com.hexacore.smartnavis_api.service.PuertoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/puerto")
public class PuertoController extends SmartNavisController<Puerto, Long> {
    private final PuertoService service;
    private final AmarraService amarraService;
    

    public PuertoController(PuertoService service, AmarraService amarraService) {
        super(service);
        this.service = service;
		this.amarraService = amarraService;
    }

    @GetMapping("nombre/{nombre}")
    public Iterable<Puerto> listarPorNombre(@PathVariable("nombre") String nombre) {
        return this.service.buscarPorNombre(nombre);
    }
    
    @GetMapping("{id}/amarra")
    public Iterable<Amarra> listarAmarras(@PathVariable("id") Long id) {
        return this.amarraService.listarAmarras(this.service.getMustExist(id));
    }
    
    @GetMapping("{id}/amarra/disponible")
    public Iterable<Amarra> listarAmarrasDisponibles(@PathVariable("id") Long id,
    		@RequestParam(required = false) Double eslora,
            @RequestParam(required = false) Double manga,
            @RequestParam(required = false) Double calado) {
        return this.amarraService.listarAmarrasDisponibles(this.service.getMustExist(id),eslora,manga,calado);
    }

    @Override
    protected Puerto updateMapper(Puerto puerto, Puerto nuevoPuerto) {
        puerto.setNombre(nuevoPuerto.getNombre());
        return puerto;
    }
}
