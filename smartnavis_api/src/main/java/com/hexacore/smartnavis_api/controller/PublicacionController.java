package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.*;

import com.hexacore.smartnavis_api.repository.PublicacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicacionController {

    @Autowired
    private PublicacionRepository repository;

    @GetMapping("/publicaciones")
    public List<Publicacion> getPublicacionesPorTipoDeBien(@RequestParam("tipos") List<String> tipos) {
        // Inicializar una lista para almacenar todas las publicaciones filtradas
        List<Publicacion> publicacionesFiltradas = new ArrayList<>();

        // Recorrer cada tipo de bien especificado en los parámetros
        for (String tipo : tipos) {
            // Filtrar las publicaciones según el tipo especificado
            switch (tipo.toLowerCase()) {
                case "inmueble":
                    // publicacionesFiltradas.addAll(repository.findByBienInmuebleIsNotNull()); // FIXME: corregir.
                    break;
                case "aeronautico":
                    // publicacionesFiltradas.addAll(repository.findByBienAeronauticoIsNotNull()); // FIXME: corregir.
                    break;
                case "embarcacion":
                    // publicacionesFiltradas.addAll(repository.findByEmbarcacionIsNotNull()); // FIXME: corregir.
                    break;
                case "automotor":
                    // publicacionesFiltradas.addAll(repository.findByBienAutomotorIsNotNull()); // FIXME: corregir.
                    break;
                default:
                    // Enviar una respuesta adecuada si el tipo no es válido
                    throw new IllegalArgumentException("Tipo de bien no válido: " + tipo);
            }
        }

        // Devolver todas las publicaciones filtradas
        return publicacionesFiltradas;
    }

    @GetMapping("/publicaciones/{id}")
    public List<Publicacion> findByNombre(@PathVariable("nombre") long id) {
        return repository.findById(id);
    }

    @PostMapping("/publicaciones")
    public Publicacion createPublicacion(@RequestBody Publicacion publicacion) {
        return repository.save(publicacion);
    }

    @PutMapping("/publicaciones/{id}")
    public Publicacion updatePublicacion(@PathVariable("id") Long id, @RequestBody Publicacion publicacion) {
        return repository.save(publicacion);
    }

    @DeleteMapping("/publicaciones/{id}")
    public void deletePublicacion(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
