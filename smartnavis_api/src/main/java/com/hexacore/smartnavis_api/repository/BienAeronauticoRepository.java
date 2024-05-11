package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.BienAeronautico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BienAeronauticoRepository extends JpaRepository<BienAeronautico, Long> {
}
