package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.service.PuertoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PuertoController {
    private final PuertoService service;

    public PuertoController(PuertoService service) {
        this.service = service;
    }

    @GetMapping("/puertos")
    public Iterable<Puerto> listarPuertos() {
        return this.service.findAll();
    }

    @GetMapping("/puertos/{nombre}")
    public Iterable<Puerto> listarPuertosPorNombre(@PathVariable("nombre") String nombre) {
        return this.service.buscarPuertosPorNombre(nombre);
    }

    @PostMapping("/puerto")
    public Puerto crearPuerto(@RequestBody Puerto puerto) {
        return this.service.persist(puerto);
    }

    @GetMapping("/puerto/{id}")
    public Puerto detallePuerto(@PathVariable("id") Long id) {
        return this.service.getMustExist(id);
    }

    @PutMapping("/puerto/{id}")
    public Puerto actualizarPuerto(@PathVariable("id") Long id, @RequestBody Puerto nuevoPuerto) {
        return this.service.patch(id, puerto -> {
            puerto.setNombre(nuevoPuerto.getNombre());
            return puerto;
        });
    }

    @DeleteMapping("/puerto/{id}")
    public void eliminarPuerto(@PathVariable("id") Long id) {
        this.service.delete(id);
    }
}
