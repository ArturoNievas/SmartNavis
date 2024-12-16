package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Puerto;
import com.hexacore.smartnavis_api.repository.PuertoRepository;
import com.hexacore.smartnavis_api.service.PuertoService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Function;

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
        return this.repository.findByNombreContainsIgnoreCase(nombre);
    }

    @Override
    public Puerto persist(Puerto puerto) {
        Optional<Puerto> puertoOptional = this.repository.findByNombre(puerto.getNombre());
        if (puertoOptional.isPresent()) {
            throw new BadRequestException("Ya existe un puerto con ese nombre.");
        }
        try {
            return super.persist(puerto);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("No fue posible crear el puerto, debido a un problema con los datos ingresados.");
        }
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El puerto no existe.");
    }

    @Override
    public void delete(Long id, Function<? super Puerto, Boolean> canDelete) throws NotFoundException {
        Puerto puerto = this.getMustExist(id);
        if (!puerto.getAmarras().isEmpty()) {
            throw new BadRequestException("El puerto no puede ser eliminado dado que cuenta con amarras asociadas.");
        }
        super.delete(id, canDelete);
    }
}
