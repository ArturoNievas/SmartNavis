package com.hexacore.smartnavis_api.model;

import com.hexacore.smartnavis_api.security.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "administradores")
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Administrador extends Usuario {
    public Administrador() {
        super();
        this.setRole(Role.ADMINISTRADOR);
    }

    public Administrador(Usuario usuario) {
        super(usuario.getDni(), usuario.getNombres(), usuario.getApellidos(), usuario.getFechaNacimiento(),
                usuario.getUsername(), usuario.getPassword(), Role.ADMINISTRADOR);
        this.setId(usuario.getId());
        this.setHabilitadaIntercambio(usuario.isHabilitadaIntercambio());
        this.setJwtToken(usuario.getJwtToken());
        this.setMensajes(usuario.getMensajes());
        this.setAlquilerTerceros(usuario.getAlquilerTerceros());
        this.setBienes(usuario.getBienes());
    }
}
