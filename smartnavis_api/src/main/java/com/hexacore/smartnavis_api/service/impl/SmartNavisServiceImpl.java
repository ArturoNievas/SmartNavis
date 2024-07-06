package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.ForbiddenException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.service.SmartNavisService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

@Transactional
public abstract class SmartNavisServiceImpl<T, ID> implements SmartNavisService<T, ID> {
    private final JpaRepository<T, ID> repository;

    public SmartNavisServiceImpl(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    @Override
    public T persist(T entity) {
        return this.repository.save(entity);
    }

    @Override
    public T getMustExist(ID id) throws NotFoundException {
        return this.repository.findById(id).orElseThrow(this::getNotFoundException);
    }

    @Override
    public Optional<T> findById(ID id) {
        return this.repository.findById(id);
    }

    @Override
    public Iterable<T> findAll() {
        return this.repository.findAll();
    }

    @Override
    public T patch(ID id, Function<? super T, ? extends T> mapper,
                   Function<? super T, Boolean> canUpdate) throws NotFoundException {
        T entity = this.getMustExist(id);
        if (canUpdate.apply(entity)) {
            System.out.println("Actualizando...");
            return repository.save(mapper.apply(entity));
        }
        throw new ForbiddenException();
    }

    @Override
    public void delete(ID id) throws NotFoundException {
        this.repository.delete(this.getMustExist(id));
    }

    protected NotFoundException getNotFoundException() {
        return new NotFoundException();
    }
}
