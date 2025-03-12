package com.apirest.apirestfull.security.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @NotEmpty
    private String nombre;

    @NotNull
    @NotEmpty
    @Column(unique = true)
    private String nombreUsuario;

    @NotNull
    @NotEmpty
    @Column(unique = true)
    private String email;

    @NotNull
    @NotEmpty
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol", 
            joinColumns = @JoinColumn(name = "usuario_id"), 
            inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Rol> roles = new HashSet<>();

    @NotNull
    private Float telefono;    
    @NotNull
    private String direccion;

    @NotNull
    private String pais;

    @NotNull
    private String provincia;

    public Usuario() {
    }

    public Usuario(@NotEmpty String nombre, @NotEmpty String nombreUsuario, Float telefono, String direccion, @NotEmpty String email,
            @NotEmpty String password, String pais, String provincia) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.password = password;
        this.pais = pais;
        this.provincia = provincia;
    }
}
