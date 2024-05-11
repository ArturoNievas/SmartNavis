package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.exception.NotFoundException;
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
    public List<Publicacion> getAll() {
        return repository.findAll();
    }

    @GetMapping("/publicaciones/tipo")
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

    @GetMapping("/publicacion/{id}")
    public List<Publicacion> findByNombre(@PathVariable("nombre") long id) {
        return repository.findById(id); // FIXME: dice buscar por nombre pero esta buscando por ID
    }

    @PostMapping("/publicacion")
    public Publicacion create(@RequestBody Publicacion publicacion) {
        return repository.save(publicacion);
    }

    @PutMapping("/publicacion/{id}")
    public Publicacion update(@PathVariable("id") Long id, @RequestBody Publicacion nuevaPublicacion) {
        return repository.findById(id).map(publicacion -> {
            publicacion.setDescripcion(nuevaPublicacion.getDescripcion());
            publicacion.setTitulo(nuevaPublicacion.getTitulo());
            return repository.save(publicacion);
        }).orElseThrow(NotFoundException::new);
    }

    @DeleteMapping("/publicacion/{id}")
    public void delete(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
