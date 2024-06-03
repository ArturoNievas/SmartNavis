package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.CrearEmbarcacionInput;
import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.repository.AlquilerTerceroRepository;
import com.hexacore.smartnavis_api.repository.EmbarcacionRepository;
import com.hexacore.smartnavis_api.service.BienService;
import com.hexacore.smartnavis_api.service.EmbarcacionService;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmbarcacionServiceImpl extends SmartNavisServiceImpl<Embarcacion, Long> implements EmbarcacionService {
    private final EmbarcacionRepository repository;
    private final BienService bienService;
    private final AlquilerTerceroRepository terceroRepository;
    private final AlquilerRepository titularRepository;

    public EmbarcacionServiceImpl(EmbarcacionRepository repository, BienService bienService, AlquilerRepository titularRepository, AlquilerTerceroRepository terceroRepository) {
        super(repository);
        this.repository = repository;
        this.bienService = bienService;
		this.terceroRepository = terceroRepository;
		this.titularRepository = titularRepository;
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("La embarcación no existe.");
    }


    @Override
    public Publicacion publicar(Embarcacion embarcacion, String titulo, String descripcion) {
        return this.bienService.publicar(embarcacion, titulo, descripcion);
    }

    @Override
    public Iterable<Embarcacion> buscarPorUsuario(Usuario usuario) {
        return this.repository.findByTitular(usuario);
    }

	@Override
	public Optional<Embarcacion> findByMatricula(String matricula) {
		return this.repository.findByMatricula(matricula);
	}

	@Override
	public Embarcacion registrarEmbarcacion(CrearEmbarcacionInput embarcacion, Persona duenio) {
		Embarcacion embarcacion1;
		Optional<Embarcacion> e = this.findByMatricula(embarcacion.getMatricula());
		if (e.isPresent()) {
			if (e.get().getTitular().getId() != duenio.getId()) {
				throw new BadRequestException("La embarcación se encuentra registrada a nombre de otro usuario.");
			}
			if (this.terceroRepository.findVigenteByEmbarcacion(e.get()).isPresent() || this.titularRepository.findVigenteByEmbarcacion(e.get()).isPresent()) {
				throw new BadRequestException("La embarcación ya se encuentra registrada en una amarra.");
			}
			embarcacion1 = e.get();
		} else {
			embarcacion1 = new Embarcacion(embarcacion.getMatricula(),embarcacion.getNombre(),embarcacion.getEslora(),embarcacion.getCalado(),embarcacion.getManga(),duenio);
			this.persist(embarcacion1);
		}
		return embarcacion1;
	}
}
