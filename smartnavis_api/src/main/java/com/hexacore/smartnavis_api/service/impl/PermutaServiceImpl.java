package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.repository.PermutaRepository;
import com.hexacore.smartnavis_api.service.PermutaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PermutaServiceImpl extends SmartNavisServiceImpl<Permuta, Long> implements PermutaService {
    public PermutaServiceImpl(PermutaRepository repository) {
        super(repository);
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El intercambio no existe.");
    }

    @Override
    public Permuta aceptarPermuta(Permuta permuta) {

        // TODO:



        return permuta;
    }


}
