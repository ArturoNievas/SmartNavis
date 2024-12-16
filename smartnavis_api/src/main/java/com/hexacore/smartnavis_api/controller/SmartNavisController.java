package com.hexacore.smartnavis_api.controller;

import com.hexacore.smartnavis_api.service.SmartNavisService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

public abstract class SmartNavisController<T, ID> {
    private final SmartNavisService<T, ID> service;

    protected SmartNavisController(SmartNavisService<T, ID> service) {
        this.service = service;
    }

    @GetMapping("")
    public Iterable<T> listAll() {
        return this.service.findAll();
    }

    @PostMapping("")
    public T create(@RequestBody T entity) {
        return this.service.persist(entity);
    }

    @GetMapping("/{id}")
    public T detail(@PathVariable("id") ID id) {
        return this.service.getMustExist(id);
    }

    protected T updateMapper(T entity, T newEntity) {
        return newEntity;
    }

    protected boolean canUpdate(T entity, UserDetails userDetails) {
        return true;
    }

    protected boolean canDelete(T entity, UserDetails userDetails) {
        return true;
    }

    @PutMapping("/{id}")
    public T update(@PathVariable("id") ID id, @RequestBody T newEntity, @AuthenticationPrincipal UserDetails userDetails) {
        return this.service.patch(id, entity -> this.updateMapper(entity, newEntity),
                entity -> this.canUpdate(entity, userDetails));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") ID id, @AuthenticationPrincipal UserDetails userDetails) {
        this.service.delete(id, entity -> this.canDelete(entity, userDetails));
    }
}
