package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {

	@Query("SELECT b FROM Bien b WHERE (?1 IS NOT NULL AND b.patente = ?1) OR (?2 IS NOT NULL AND b.matricula = ?2) OR (?3 IS NOT NULL AND b.partida = ?3)")
	Optional<Bien> findByPatenteMatriculaPartida(String patente, String matricula, String partida);
}
