package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Amarra;
import com.hexacore.smartnavis_api.model.Puerto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AmarraRepository extends JpaRepository<Amarra, Long> {
	
	Iterable<Amarra> findByPuerto(Puerto puerto);
	
	@Query("SELECT a FROM Amarra a WHERE a.puerto = ?1 AND (?2 IS NULL OR a.eslora >= ?2) AND (?3 IS NULL OR a.manga >= ?3) AND (?4 IS NULL OR a.calado >= ?4) AND a.disponible = true ORDER BY a.eslora")
	Iterable<Amarra> buscarDisponiblesPorPuerto(Puerto puerto, Double eslora, Double manga, Double calado);

	Optional<Amarra> findByPuertoAndNombre(Puerto puerto, String nombre);
}
