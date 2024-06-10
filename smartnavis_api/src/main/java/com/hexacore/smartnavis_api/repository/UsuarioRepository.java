package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT u FROM Usuario u WHERE CAST( u.dni AS string ) LIKE %?1%")
    Iterable<Usuario> findByDniLike(int dni);

    Optional<Usuario> findByUsername(String username);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO usuarios(password, role, username, persona_id) " +
            "VALUES(:password, :role, :username, :personaId)", nativeQuery = true)
    void addUserToPersona(@Param("personaId") Long personaId, @Param("username") String username,
                          @Param("password") String password, @Param("role") String role);
}
