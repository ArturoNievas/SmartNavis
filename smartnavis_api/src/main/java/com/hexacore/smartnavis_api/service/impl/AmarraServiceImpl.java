package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.repository.AmarraRepository;
import com.hexacore.smartnavis_api.service.AmarraService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AmarraServiceImpl extends SmartNavisServiceImpl<Amarra, Long> implements AmarraService {
    // private final AmarraRepository repository;

    public AmarraServiceImpl(AmarraRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
