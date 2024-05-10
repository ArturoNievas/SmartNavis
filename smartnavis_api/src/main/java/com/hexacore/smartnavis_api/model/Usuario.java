package com.hexacore.smartnavis_api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
@PrimaryKeyJoinColumn(name = "persona_id")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario extends Persona {
    private String username;

    private String password;

    @OneToMany(mappedBy = "autor")
    private List<Mensaje> mensajes;

    public Usuario() {
        this.setMensajes(new ArrayList<>());
    }

    public String getUsername() {
        return username;
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

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }
}
