package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Mensaje;
import com.hexacore.smartnavis_api.repository.MensajeRepository;
import com.hexacore.smartnavis_api.service.MensajeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MensajeServiceImpl extends SmartNavisServiceImpl<Mensaje, Long> implements MensajeService {
    // private final MensajeRepository repository;

    public MensajeServiceImpl(MensajeRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
