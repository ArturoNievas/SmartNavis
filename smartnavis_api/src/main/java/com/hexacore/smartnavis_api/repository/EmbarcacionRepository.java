package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Embarcacion;
import com.hexacore.smartnavis_api.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmbarcacionRepository extends JpaRepository<Embarcacion, Long> {
    Iterable<Embarcacion> findByTitular(Persona titular);
}
