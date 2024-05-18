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
    public UsuarioServiceImpl(UsuarioRepository repository) {
        super(repository);
    }

    @Override
    public Optional<Usuario> buscarPorPersona(Persona persona) {
        return this.findById(persona.getId());
    }
}
