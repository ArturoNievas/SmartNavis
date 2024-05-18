package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.repository.AdministradorRepository;
import com.hexacore.smartnavis_api.service.AdministradorService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdministradorServiceImpl extends SmartNavisServiceImpl<Administrador, Long> implements AdministradorService {
    // private final AdministradorRepository repository;

    public AdministradorServiceImpl(AdministradorRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
