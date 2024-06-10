package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Persona;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    Optional<Persona> findByDni(int dni);
}
