package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.repository.AlquilerTerceroRepository;
import com.hexacore.smartnavis_api.service.AlquilerTerceroService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlquilerTerceroServiceImpl extends SmartNavisServiceImpl<AlquilerTercero, Long>
        implements AlquilerTerceroService {
    // private final AlquilerTerceroRepository repository;

    public AlquilerTerceroServiceImpl(AlquilerTerceroRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
