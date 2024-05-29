package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.model.Persona;
import com.hexacore.smartnavis_api.model.Usuario;
import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.service.UsuarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl extends SmartNavisServiceImpl<Usuario, Long> implements UsuarioService {
    private final UsuarioRepository repository;
	
	public UsuarioServiceImpl(UsuarioRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public Optional<Usuario> buscarPorPersona(Persona persona) {
        return this.findById(persona.getId());
    }

	@Override
	public Iterable<Usuario> buscarPorDNI(int dni) {
		return this.repository.findByDniLike(dni);
	}
}
