package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import com.hexacore.smartnavis_api.exception.NotFoundException;
import com.hexacore.smartnavis_api.model.Administrador;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.AdministradorRepository;
import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.security.Role;
import com.hexacore.smartnavis_api.service.AdministradorService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdministradorServiceImpl extends SmartNavisServiceImpl<Administrador, Long> implements AdministradorService {
    private final AdministradorRepository administradorRepository;
    private final UsuarioRepository usuarioRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public AdministradorServiceImpl(AdministradorRepository administradorRepository,
                                    UsuarioRepository usuarioRepository) {
        super(administradorRepository);
        this.administradorRepository = administradorRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Administrador obtenerAdministradorPorUsername(String username) {
        return this.administradorRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("El administrador no existe."));
    }

    @Override
    public Optional<Administrador> buscarPorUsername(String username) {
        return this.administradorRepository.findByUsername(username);
    }

    @Override
    public Usuario degradarAdministrador(Administrador solicitante, Administrador degradado) {
        if (solicitante.equals(degradado)) { // Este caso también cubre que no se borre el último administrador.
            throw new BadRequestException("El administrador no se puede degradar a sí mismo.");
        }
        Usuario usuario = this.usuarioRepository.findById(degradado.getId())
                .orElseThrow(() -> new NotFoundException("No se pudo recuperar el usuario del administrador."));
        usuario.setRole(Role.USUARIO);
        this.entityManager.createNativeQuery("DELETE FROM administradores WHERE usuario_id = :usuario_id")
                .setParameter("usuario_id", usuario.getId())
                .executeUpdate();
        return this.usuarioRepository.save(usuario);
    }

    @Override
    protected NotFoundException getNotFoundException() {
        return new NotFoundException("El administrador no existe.");
    }
}
