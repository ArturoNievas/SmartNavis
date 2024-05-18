package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.DisponibilidadAmarra;
import com.hexacore.smartnavis_api.repository.DisponibilidadAmarraRepository;
import com.hexacore.smartnavis_api.service.DisponibilidadAmarraService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DisponibilidadAmarraServiceImpl extends SmartNavisServiceImpl<DisponibilidadAmarra, Long>
        implements DisponibilidadAmarraService {
    // private final DisponibilidadAmarraRepository repository;

    public DisponibilidadAmarraServiceImpl(DisponibilidadAmarraRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
