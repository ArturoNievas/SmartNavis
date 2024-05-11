package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.*;

import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicacionController {
    private final PublicacionService service;

    public PublicacionController(PublicacionService service) {
        this.service = service;
    }

    @GetMapping("/publicaciones")
    public Iterable<Publicacion> listarPublicaciones() {
        return this.service.findAll();
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

    @PostMapping("/publicacion")
    public Publicacion crearPublicacion(@RequestBody Publicacion publicacion) {
        return this.service.persist(publicacion);
    }

    @GetMapping("/publicacion/{id}")
    public Publicacion detallePublicacion(@PathVariable("id") Long id) {
        return this.service.getMustExist(id);
    }

    @PutMapping("/publicacion/{id}")
    public Publicacion actualizarPublicacion(@PathVariable("id") Long id, @RequestBody Publicacion nuevaPublicacion) {
        return this.service.patch(id, publicacion -> {
            publicacion.setDescripcion(nuevaPublicacion.getDescripcion());
            publicacion.setTitulo(nuevaPublicacion.getTitulo());
            // FIXME: esto realiza una actualización básica. La HU indica poder modificar el bien asociado. **CONSULTAR**
            return publicacion;
        });
    }

    @DeleteMapping("/publicacion/{id}")
    public void eliminarPublicacion(@PathVariable("id") Long id) {
        this.service.delete(id);
    }
}
