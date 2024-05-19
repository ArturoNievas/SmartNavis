package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.model.Publicacion;

import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.web.bind.annotation.*;

import com.hexacore.smartnavis_api.controller.input.CrearPermutaInput;
import com.hexacore.smartnavis_api.model.*;

@RestController
@RequestMapping("api/publicacion")
public class PublicacionController extends SmartNavisController<Publicacion, Long> {
    private final PublicacionService service;

    public PublicacionController(PublicacionService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("embarcacion")
    public Iterable<Publicacion> listarEmbarcaciones() {
        return this.service.buscarPorTipo(Embarcacion.class);
    }

    @PostMapping("{id}/solicitar")
    public Permuta solicitar(@PathVariable("id") Long id, @RequestBody CrearPermutaInput input) {
        return this.service.solicitar(this.service.getMustExist(id), this.service.getMustExist(input.getOfertadaId()));
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


    @Override
    protected Publicacion updateMapper(Publicacion publicacion, Publicacion nuevaPublicacion) {
        publicacion.setDescripcion(nuevaPublicacion.getDescripcion());
        publicacion.setTitulo(nuevaPublicacion.getTitulo());
        return publicacion;
    }
}
