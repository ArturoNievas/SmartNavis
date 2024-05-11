package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    Optional<Publicacion> findByBien(Bien bien);

    /*  FIXME: corregir.
    List<Publicacion> findByBienAutomotorIsNotNull();
    List<Publicacion> findByBienInmuebleIsNotNull();
    List<Publicacion> findByBienAeronauticoIsNotNull();
    List<Publicacion> findByEmbarcacionIsNotNull();
    */
}
