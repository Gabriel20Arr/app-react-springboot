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
    private Float ancho;
    private Float stock;
    @Min(0)
    
    private String descripcion;
    private String urlimg;
    private Boolean featured;
    private String categoria;
    
    public ProductoDto(@NotBlank String nombre, @Min(0) Float precio, Float peso, Float altura, Float ancho, Float stock, @Min(0) String descripcion, String urlimg, Boolean featured, String categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.altura = altura;
        this.ancho = ancho;
        this.stock = stock;
        this.descripcion = descripcion;
        this.featured = featured;
        this.categoria = categoria;
    }

    @Override
    public String toString() {
        return "ProductoDto [nombre=" + nombre + ", precio=" + precio + ", descripcion=" + descripcion + "featured=" + featured + "]";
    }
    
}
