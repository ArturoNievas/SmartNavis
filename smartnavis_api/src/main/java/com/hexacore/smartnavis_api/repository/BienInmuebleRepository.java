package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.BienInmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BienInmuebleRepository extends JpaRepository<BienInmueble, Long> {
}
