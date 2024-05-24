package com.hexacore.smartnavis_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hexacore.smartnavis_api.security.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "usuarios")
@PrimaryKeyJoinColumn(name = "persona_id")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario extends Persona implements UserDetails {
    @Column(unique = true, updatable = false)
    private String username;

    @JsonIgnore
    private String password;

    @JsonIgnore
    @Transient
    private String jwtToken;

    @JsonIgnore
    @OneToMany(mappedBy = "autor")
    private List<Mensaje> mensajes;

    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private Role role;

    public Usuario() {
        super();
        this.setRole(Role.USUARIO);
        this.setMensajes(new ArrayList<>());
    }

    public Usuario(int dni, String nombres, String apellidos, Date fechaNacimiento,
                   String username, String password, Role role) {
        super(dni, nombres, apellidos, fechaNacimiento);
        this.setUsername(username);
        this.setPassword(password);
        this.setRole(role);
        this.setMensajes(new ArrayList<>());
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.getRole().name()));
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }

    public void addMensaje(Mensaje mensaje) {
        if (mensaje != null) {
            List<Mensaje> mensajes = getMensajes();
            if (!mensajes.contains(mensaje)) {
                mensajes.add(mensaje);
                mensaje.setAutor(this);
            }
        }
    }

    public void removeMensaje(Mensaje mensaje) {
        this.getMensajes().remove(mensaje);
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
