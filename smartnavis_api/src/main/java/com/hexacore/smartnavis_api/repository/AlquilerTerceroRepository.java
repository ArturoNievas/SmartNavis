package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.AlquilerTercero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerTerceroRepository extends JpaRepository<AlquilerTercero, Long> {
}
