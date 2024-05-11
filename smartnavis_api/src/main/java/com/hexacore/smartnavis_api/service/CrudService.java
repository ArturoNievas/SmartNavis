package com.hexacore.smartnavis_api.service;

import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.function.Function;

public interface CrudService<T, ID> {
    T create(T entity);

    T get(ID id) throws ChangeSetPersister.NotFoundException;

    Iterable<T> all();

    T update(T entity);

    T patch(ID id, Function<? super T, ? extends T> mapper);

    void delete(ID id);
}
