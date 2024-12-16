package com.hexacore.smartnavis_api.service;

import com.hexacore.smartnavis_api.exception.NotFoundException;

import java.util.Optional;
import java.util.function.Function;

public interface SmartNavisService<T, ID> {
    T persist(T entity);

    T getMustExist(ID id) throws NotFoundException;

    Optional<T> findById(ID id);

    Iterable<T> findAll();

    T patch(ID id, Function<? super T, ? extends T> mapper, Function<? super T, Boolean> canUpdate);

    void delete(ID id, Function<? super T, Boolean> canDelete);
}
