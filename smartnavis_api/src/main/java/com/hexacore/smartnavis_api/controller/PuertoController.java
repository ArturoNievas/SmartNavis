package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.PuertoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PuertoController {
    @Autowired
    private PuertoRepository repository;

    @GetMapping("/puertos")
    public List<Puerto> allPuertos() {
        return repository.findAll();
    }

    @GetMapping("/puerto/{nombre}")
    public List<Puerto> findByNombre(@PathVariable("nombre") String nombre) {
        return repository.findByNombre(nombre);
    }

    @PostMapping("/puerto")
    public Puerto createPuerto(@RequestBody Puerto puerto) {
        return repository.save(puerto);
    }

    @PutMapping("/puerto/{id}")
    public Puerto updatePuerto(@PathVariable("id") Long id, @RequestBody Puerto puerto) {
        return repository.save(puerto);
    }

    @DeleteMapping("/puerto/{id}")
    public void deletePuerto(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
