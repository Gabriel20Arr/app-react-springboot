package com.apirest.apirestfull.security.dto;

import java.util.HashSet;
import java.util.Set;

import com.apirest.apirestfull.security.entity.Rol;
import com.apirest.apirestfull.security.enums.RolNombre;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NuevoUsuario {

    @NotBlank
    private String nombre;

    @NotBlank
    private String nombreUsuario;

    @Email
    private String email;

    @NotBlank
    private String password;

     private Set<RolNombre> roles;
}
