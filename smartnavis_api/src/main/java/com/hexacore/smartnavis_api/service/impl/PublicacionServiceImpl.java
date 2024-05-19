package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.*;
import com.hexacore.smartnavis_api.repository.PublicacionRepository;
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

    public PublicacionServiceImpl(PublicacionRepository repository, PermutaService permutaService) {
        super(repository);
        this.repository = repository;
        this.permutaService = permutaService;
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
}
