package com.hexacore.smartnavis_api.service.impl;

import com.hexacore.smartnavis_api.repository.UsuarioRepository;
import com.hexacore.smartnavis_api.service.AuthDetailService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthDetailServiceImpl implements AuthDetailService {
    private final UsuarioRepository repository;

    public AuthDetailServiceImpl(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return repository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado."));
            }
        };
    }
}
