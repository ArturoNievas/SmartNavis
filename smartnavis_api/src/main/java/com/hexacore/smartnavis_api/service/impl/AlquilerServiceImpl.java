package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.repository.AlquilerRepository;
import com.hexacore.smartnavis_api.service.AlquilerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlquilerServiceImpl extends SmartNavisServiceImpl<Alquiler, Long> implements AlquilerService {
    // private final AlquilerRepository repository;

    public AlquilerServiceImpl(AlquilerRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
