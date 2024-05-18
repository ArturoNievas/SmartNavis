package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.PuertoRepository;
import com.hexacore.smartnavis_api.service.PuertoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PuertoServiceImpl extends SmartNavisServiceImpl<Puerto, Long> implements PuertoService {
    private final PuertoRepository repository;

    public PuertoServiceImpl(PuertoRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public Iterable<Puerto> buscarPorNombre(String nombre) {
        return this.repository.findByNombre(nombre);
    }
}
