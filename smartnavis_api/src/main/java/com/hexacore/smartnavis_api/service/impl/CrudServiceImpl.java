package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.service.CrudService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.function.Function;

public class CrudServiceImpl<T, ID> implements CrudService<T, ID> {
    private final JpaRepository<T, ID> repository;

    public CrudServiceImpl(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    @Override
    public T create(T entity) {
        return this.repository.save(entity);
    }

    @Override
    public T get(ID id) throws NotFoundException {
        return this.repository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public Iterable<T> all() {
        return this.repository.findAll();
    }

    @Override
    public T update(T entity) {
        return this.repository.save(entity);
    }

    @Override
    public T patch(ID id, Function<? super T, ? extends T> mapper) throws NotFoundException {
        return this.repository.findById(id).map((T entity) -> {
            T newEntity = mapper.apply(entity);
            return repository.save(newEntity);
        }).orElseThrow(NotFoundException::new);
    }

    @Override
    public void delete(ID id) throws NotFoundException {
        T entity = this.repository.findById(id).orElseThrow(NotFoundException::new);
        this.repository.delete(entity);
    }
}
