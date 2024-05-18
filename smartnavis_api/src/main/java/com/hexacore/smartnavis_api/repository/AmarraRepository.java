package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Amarra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmarraRepository extends JpaRepository<Amarra, Long> {
}
