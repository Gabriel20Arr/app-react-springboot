package com.apirest.apirestfull.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apirest.apirestfull.entity.Producto;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findByNombre(String nombre);

    List<Producto> findByUsuarioId(int usuarioId);

    boolean existsByNombre(String nombre);
}
