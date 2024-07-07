package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.controller.input.BienInput;
import com.hexacore.smartnavis_api.controller.input.PublicacionInput;
import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.model.*;
import com.hexacore.smartnavis_api.repository.BienRepository;
import com.hexacore.smartnavis_api.repository.PublicacionRepository;
import com.hexacore.smartnavis_api.service.BienService;
import com.hexacore.smartnavis_api.service.PermutaService;
import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PublicacionServiceImpl extends SmartNavisServiceImpl<Publicacion, Long> implements PublicacionService {
    private final PublicacionRepository repository;
    private final PermutaService permutaService;
    private final BienRepository bienRepository;

    public PublicacionServiceImpl(PublicacionRepository repository, PermutaService permutaService, BienRepository bienRepository) {
        super(repository);
        this.repository = repository;
        this.permutaService = permutaService;
		this.bienRepository = bienRepository;
    }

    @Override
    public Optional<Publicacion> buscarPorBien(Bien bien) {
        return this.repository.findByBien(bien);
    }

    @Override
    public Optional<Publicacion> buscarPorEmbarcacion(Embarcacion embarcacion) {
        return this.buscarPorBien(embarcacion);
    }

    @Override
    public Publicacion crear(String titulo, String descripcion, Bien bien) {
        return this.repository.save(new Publicacion(titulo, descripcion, bien));
    }

    @Override
    public List<Publicacion> buscarPorTipo(Class<? extends Bien> tipo) {
        return this.repository.buscarPorTipo(tipo);
    }

    @Override
    public Permuta solicitar(Publicacion solicitada, Publicacion ofertada) {
        return this.permutaService.crear(solicitada, ofertada);
    }

    @Override
    public Iterable<Publicacion> buscarPorUsuario(Usuario usuario) {
        return this.repository.findByTitularBien(usuario);
    }

	@Override
	public Publicacion crearPublicacion(PublicacionInput input, Usuario usuario) {
		BienInput bienInput = input.getBien();
		if (this.bienRepository.findByPatenteMatriculaPartida(bienInput.getPatente(), bienInput.getMatricula(), bienInput.getPartida()).isPresent()) {
			throw new BadRequestException("El bien ya se encuentra publicado.");
		};
		
		if (!usuario.isHabilitadaIntercambio()) {
			throw new BadRequestException("El usuario no se encuentra habilitado para hacer intercambios.");
		}
		
		Bien bien;
		if (bienInput.getPatente() != null) {
			bien = new BienAutomotor(bienInput.getPatente());
			bien.setHabilitadoIntercambio(!bienInput.getPatente().contains("Z"));
		} else if (bienInput.getMatricula() != null) {
			bien = new BienAeronautico(bienInput.getMatricula());
			bien.setHabilitadoIntercambio(!bienInput.getMatricula().contains("Z"));
		} else {
			bien = new BienInmueble(bienInput.getPartida());
			bien.setHabilitadoIntercambio(!bienInput.getPartida().contains("Z"));
		}
		
		if (!bien.isHabilitadoIntercambio()) {
			throw new BadRequestException("El bien no se encuentra habilitado para ser intercambiado.");
		}
		
		bien.setTitular(usuario);
		
		this.bienRepository.save(bien);
		
		return this.crear(input.getTitulo(), input.getDescripcion(), bien);
	}
}
