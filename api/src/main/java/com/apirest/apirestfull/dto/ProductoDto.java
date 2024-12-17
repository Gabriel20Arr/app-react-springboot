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
    
    private Float peso;
    private Float altura;
    @Min(0)
    private String descripcion;
    private String urlimg;
    
    public ProductoDto(@NotBlank String nombre, @Min(0) Float precio, Float peso, Float altura, @Min(0) String descripcion, String urlimg) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.altura = altura;
        this.descripcion = descripcion;
        this.urlimg = urlimg;
    }

    @Override
    public String toString() {
        return "ProductoDto [nombre=" + nombre + ", precio=" + precio + ", descripcion=" + descripcion + "]";
    }
    
}
