package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Permuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermutaRepository extends JpaRepository<Permuta, Long> {
}
