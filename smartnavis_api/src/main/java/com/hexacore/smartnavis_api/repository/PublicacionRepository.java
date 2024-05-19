package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Bien;
import com.hexacore.smartnavis_api.model.Publicacion;

import com.hexacore.smartnavis_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    Optional<Publicacion> findByBien(Bien bien);

    @Query("FROM Publicacion p WHERE TYPE(p.bien) = :tipoBienClase")
    List<Publicacion> buscarPorTipo(@Param("tipoBienClase") Class<? extends Bien> tipoBienClase);

    @Query("from Publicacion as p join p.bien as b where b.titular = :titular")
    List<Publicacion> findByTitularBien(Usuario titular);
}
