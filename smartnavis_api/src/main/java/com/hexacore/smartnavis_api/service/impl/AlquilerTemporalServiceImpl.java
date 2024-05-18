package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.AlquilerTemporal;
import com.hexacore.smartnavis_api.repository.AlquilerTemporalRepository;
import com.hexacore.smartnavis_api.service.AlquilerTemporalService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AlquilerTemporalServiceImpl extends SmartNavisServiceImpl<AlquilerTemporal, Long>
        implements AlquilerTemporalService {
    // private final AlquilerTemporalRepository repository;

    public AlquilerTemporalServiceImpl(AlquilerTemporalRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
