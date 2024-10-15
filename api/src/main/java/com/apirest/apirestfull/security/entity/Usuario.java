package com.apirest.apirestfull.security.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty
    private String nombre;

    @NotEmpty
    @Column(unique = true)
    private String nombreUsuario;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol", 
            joinColumns = @JoinColumn(name = "usuario_id"), 
            inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Rol> roles = new HashSet<>();


    public Usuario() {
    }

    public Usuario(@NotEmpty String nombre, @NotEmpty String nombreUsuario, @NotEmpty String email,
            @NotEmpty String password) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
    }
}
