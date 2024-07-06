package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.AdministradorRepository;
import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.security.Role;
import com.hexacore.smartnavis_api.service.UsuarioService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Function;

@Service
@Transactional
public class UsuarioServiceImpl extends SmartNavisServiceImpl<Usuario, Long> implements UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final AdministradorRepository administradorRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, AdministradorRepository administradorRepository) {
        super(usuarioRepository);
        this.usuarioRepository = usuarioRepository;
        this.administradorRepository = administradorRepository;
    }

    @Override
    public Optional<Usuario> buscarPorPersona(Persona persona) {
        return this.findById(persona.getId());
    }

    @Override
    public Iterable<Usuario> buscarPorDNI(int dni) {
        return this.usuarioRepository.findByDniLike(dni);
    }

    @Override
    public Administrador promoverAdministrador(Usuario usuario) {
        Optional<Administrador> administradorOptional = this.administradorRepository.findById(usuario.getId());
        if (administradorOptional.isPresent()) {
            throw new BadRequestException("El usuario ya es administrador.");
        }
        this.entityManager.createNativeQuery("INSERT INTO administradores(usuario_id) VALUES(?)")
                .setParameter(1, usuario.getId())
                .executeUpdate();
        usuario.setRole(Role.ADMINISTRADOR);
        this.usuarioRepository.save(usuario);
        return new Administrador(this.usuarioRepository.save(usuario));
    }

    @Override
    public Usuario buscarPorUsernameSeguroExiste(String username) {
        return this.usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("El usuario no existe."));
    }

    @Override
    public void delete(Long id, Function<? super Usuario, Boolean> canDelete) throws NotFoundException {
        Optional<Administrador> administradorOptional = this.administradorRepository.findById(id);
        if (administradorOptional.isPresent()) {
            throw new BadRequestException("No se puede eliminar un usuario administrador.");
        }
        Usuario usuario = this.getMustExist(id);
        this.entityManager.createNativeQuery("DELETE FROM usuarios WHERE persona_id = :persona_id")
                .setParameter("persona_id", usuario.getId())
                .executeUpdate();
    }
}
