package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.controller.input.AlquilerTerceroRequest;
import com.hexacore.smartnavis_api.controller.input.AlquilerTitularRequest;
import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.service.AlquilerService;
import com.hexacore.smartnavis_api.service.AlquilerTerceroService;
import com.hexacore.smartnavis_api.service.AmarraService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/amarra")
public class AmarraController extends SmartNavisController<Amarra, Long> {
    private final AmarraService service;
    private final AlquilerService alquilerService;
    private final AlquilerTerceroService alquilerTerceroService;
    

    public AmarraController(AmarraService service, AlquilerService alquilerService, AlquilerTerceroService alquilerTerceroService) {
        super(service);
        this.service = service;
		this.alquilerService = alquilerService;
		this.alquilerTerceroService = alquilerTerceroService;
    }
    
    @Override
    protected Amarra updateMapper(Amarra amarra, Amarra nuevaAmarra) {
        if (!amarra.isDisponible()) {
        	throw new BadRequestException("No se puede modificar una amarra en uso.");
        }
    	amarra.setCalado(nuevaAmarra.getCalado());
        amarra.setEslora(nuevaAmarra.getEslora());
        amarra.setManga(nuevaAmarra.getManga());
        amarra.setNombre(nuevaAmarra.getNombre());
        return amarra;
    }
    
    @PostMapping("{id}/alquilarTitular")
    public Alquiler alquilarTitular(@PathVariable("id") Long id, @RequestBody AlquilerTitularRequest alquiler) {
    	if (!this.service.getMustExist(id).isDisponible()) {
    		throw new BadRequestException("La amarra no se encuentra disponible.");
    	}
    	return this.alquilerService.alquilarTitular(id,alquiler.getEmbarcacion(),alquiler.getTitularId());
    }
    
    @PostMapping("{id}/alquilarTercero")
    public Alquiler alquilarTercero(@PathVariable("id") Long id, @RequestBody AlquilerTerceroRequest alquiler) {
    	if (!this.service.getMustExist(id).isDisponible()) {
    		throw new BadRequestException("La amarra no se encuentra disponible.");
    	}
    	return this.alquilerTerceroService.alquilarTercero(id,alquiler.getEmbarcacion(),alquiler.getTitularId(),alquiler.getDuenio(), alquiler.getParentezco());
    }

}
