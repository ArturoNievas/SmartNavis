package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Bien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BienRepository extends JpaRepository<Bien, Long> {
}
