package com.hexacore.smartnavis_api.repository;

import com.hexacore.smartnavis_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	@Query("SELECT u FROM Usuario u WHERE CAST( u.dni AS string ) LIKE %?1%")
	Iterable<Usuario> findByDniLike(int dni);
}
