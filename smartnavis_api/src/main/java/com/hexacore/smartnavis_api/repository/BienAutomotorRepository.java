package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.BienAutomotor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BienAutomotorRepository extends JpaRepository<BienAutomotor, Long> {
}
