package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Puerto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PuertoRepository extends JpaRepository<Puerto, Long> {
    Optional<Puerto> findByNombre(@Param("nombre") String nombre);

    List<Puerto> findByNombreContainsIgnoreCase(@Param("nombre") String nombre);
}
