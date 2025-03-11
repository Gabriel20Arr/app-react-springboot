package com.apirest.apirestfull.security.dto;

import java.util.Set;
import com.apirest.apirestfull.security.enums.RolNombre;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private Number telefono;

    @NotBlank
    private String direccion;

    @NotBlank
    private String pais;

    @NotBlank
    private String provincia;

    private Set<RolNombre> roles;
}
