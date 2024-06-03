package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.AlquilerTercero;
import com.hexacore.smartnavis_api.model.Embarcacion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerTerceroRepository extends JpaRepository<AlquilerTercero, Long> {
	
	@Query("SELECT a FROM Alquiler a WHERE a.embarcacion = ?1 AND a.fin IS NULL")
	Optional<AlquilerTercero> findVigenteByEmbarcacion(Embarcacion embarcacion);
}
