package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Publicacion;
import com.hexacore.smartnavis_api.repository.PublicacionRepository;
import com.hexacore.smartnavis_api.service.PublicacionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PublicacionServiceImpl extends SmartNavisServiceImpl<Publicacion, Long> implements PublicacionService {
    private final PublicacionRepository repository;

    public PublicacionServiceImpl(PublicacionRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public Optional<Publicacion> findByBien(Bien bien) {
        return this.repository.findByBien(bien);
    }

    @Override
    public Optional<Publicacion> findByEmbarcacion(Embarcacion embarcacion) {
        return this.findByBien(embarcacion);
    }

    @Override
    public Publicacion crearPublicacion(String titulo, String descripcion, Bien bien) {
        return this.repository.save(new Publicacion(titulo, descripcion, bien));
    }

	@Override
	public List<Publicacion> buscarPorTipo(Class<? extends Bien> tipo) {
		return this.repository.buscarPorTipo(tipo);
	}
}
