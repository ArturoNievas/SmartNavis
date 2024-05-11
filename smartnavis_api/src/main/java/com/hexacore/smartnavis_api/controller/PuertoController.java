package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.PuertoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PuertoController {
    private final PuertoRepository repository;

    public PuertoController(PuertoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/puertos")
    public List<Puerto> getAll() {
        return repository.findAll();
    }

    @GetMapping("/puerto/{nombre}")
    public List<Puerto> findByNombre(@PathVariable("nombre") String nombre) {
        return repository.findByNombre(nombre);
    }

    @PostMapping("/puerto")
    public Puerto create(@RequestBody Puerto puerto) {
        return repository.save(puerto);
    }

    @PutMapping("/puerto/{id}")
    public Puerto update(@PathVariable("id") Long id, @RequestBody Puerto puerto) {
        return repository.save(puerto);
    }

    @DeleteMapping("/puerto/{id}")
    public void delete(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
