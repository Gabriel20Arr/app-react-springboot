package com.apirest.apirestfull.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoDto {

    @NotBlank
    private String nombre;
    @Min(0)
    private Float precio;
    
    public ProductoDto(@NotBlank String nombre, @Min(0) Float precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    
}
