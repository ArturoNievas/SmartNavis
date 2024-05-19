package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Alquiler;
import com.hexacore.smartnavis_api.model.Embarcacion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {
	Optional<Alquiler> findByEmbarcacion(Embarcacion embarcacion);
}
