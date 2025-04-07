package com.apirest.apirestfull.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDto {
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @Min(value = 0, message = "El precio debe ser mayor o igual a 0")
    private Float precio;
    
    private Float peso;
    private Float altura;
    private Float ancho;
    private Float stock;
    
    private String descripcion;
    private List<String> urlimgs;
    private Boolean featured;
    private String categoria;

    @Override
    public String toString() {
        return "ProductoDto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", peso=" + peso +
                ", altura=" + altura +
                ", ancho=" + ancho +
                ", stock=" + stock +
                ", descripcion='" + descripcion + '\'' +
                ", urlimgs=" + urlimgs +
                ", featured=" + featured +
                ", categoria='" + categoria + '\'' +
                '}';
    }
}
