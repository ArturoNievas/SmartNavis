package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.AlquilerTemporal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerTemporalRepository extends JpaRepository<AlquilerTemporal, Long> {
}
