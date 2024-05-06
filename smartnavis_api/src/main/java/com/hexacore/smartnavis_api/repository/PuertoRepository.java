package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Puerto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PuertoRepository extends JpaRepository<Puerto, Long> {
    List<Puerto> findByNombre(@Param("nombre") String nombre);
}
