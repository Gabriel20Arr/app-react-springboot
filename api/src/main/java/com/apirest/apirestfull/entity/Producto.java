package com.apirest.apirestfull.entity;

import java.io.Serializable;

import com.apirest.apirestfull.security.entity.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "producto")
@Getter
@Setter
@NoArgsConstructor
public class Producto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private float precio;
    private Float peso;
    private Float altura;
    private Float ancho;
    private Float stock;
    private String descripcion;
    private boolean featured;
    private String categoria;
    private String imagen;
    
    // Relacion con la tabla usuarios
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Producto(int id, String nombre, float precio, Float peso, Float altura, Float ancho, Float stock,
            String descripcion, boolean featured, String categoria, Usuario usuario) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.altura = altura;
        this.ancho = ancho;
        this.stock = stock;
        this.descripcion = descripcion;
        this.featured = featured;
        this.categoria = categoria;
        this.usuario = usuario;
    }
}
