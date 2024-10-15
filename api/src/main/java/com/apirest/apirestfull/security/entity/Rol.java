package com.apirest.apirestfull.security.entity;

import com.apirest.apirestfull.security.enums.RolNombre;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa la entidad Rol en la base de datos.
 */
@Entity
@Table(name = "rol")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RolNombre rolNombre;

    /**
     * Constructor que inicializa el rol con el nombre proporcionado.
     * 
     * @param rolNombre el nombre del rol
     */
    public Rol(@NotNull RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }

    // Nuevo constructor que acepta un String
    public Rol(String rolNombre) {
        this.rolNombre = RolNombre.valueOf(rolNombre.toUpperCase()); // Convertir el String a Enum
    }

    @Override
    public String toString() {
        return "Rol{" +
                "id=" + id +
                ", rolNombre=" + rolNombre +
                '}';
    }

}
