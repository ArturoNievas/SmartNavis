package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.*;

import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.web.bind.annotation.*;
import com.hexacore.smartnavis_api.model.*;

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

    
    // Por si queremos filtrar las publicaciones
    /*
    private Class<? extends Bien> obtenerClasePorTipo(String tipo) {
        switch (tipo.toLowerCase()) {
            case "automotor":
                return BienAutomotor.class;
            case "inmueble":
                return BienInmueble.class;
            case "aeronautico":
                return BienAeronautico.class;
            case "embarcacion":
            	return Embarcacion.class;
            // Agrega más casos según sea necesario para otros tipos de bien
            default:
                throw new IllegalArgumentException("Tipo de bien no válido: " + tipo);
        }
    }
    
    @GetMapping("/publicaciones")
    public Iterable<Publicacion> getPublicacionesPorTipoDeBien(@RequestParam("tipos") List<String> tipos) {
        if (tipos.isEmpty()) {
        	return this.service.findAll();
        } else {
        	// Inicializar una lista para almacenar todas las publicaciones filtradas
        	List<Publicacion> publicacionesFiltradas = new ArrayList<>();

            // Recorrer cada tipo de bien especificado en los parámetros
            for (String tipo : tipos) {
                // Filtrar las publicaciones según el tipo especificado
            	publicacionesFiltradas.addAll(service.buscarPorTipo(obtenerClasePorTipo(tipo)));
            }

            // Devolver todas las publicaciones filtradas
            return publicacionesFiltradas;
        }
    }
    */

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
            return publicacion;
        });
    }

    @DeleteMapping("/publicacion/{id}")
    public void eliminarPublicacion(@PathVariable("id") Long id) {
        this.service.delete(id);
    }
}
