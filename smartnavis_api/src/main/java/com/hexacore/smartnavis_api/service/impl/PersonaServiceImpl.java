package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.repository.PersonaRepository;
import com.hexacore.smartnavis_api.service.PersonaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PersonaServiceImpl extends SmartNavisServiceImpl<Persona, Long> implements PersonaService {
    // private final PersonaRepository repository;

    public PersonaServiceImpl(PersonaRepository repository) {
        super(repository);
        // this.repository = repository;
    }
}
