package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Permuta;
import com.hexacore.smartnavis_api.model.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermutaRepository extends JpaRepository<Permuta, Long> {
    Optional<Permuta> findBySolicitadaAndOfertada(Publicacion solicitada, Publicacion ofertada);

    Iterable<Permuta> findBySolicitada(Publicacion publicacion);

    Iterable<Permuta> findByOfertada(Publicacion publicacion);
}
