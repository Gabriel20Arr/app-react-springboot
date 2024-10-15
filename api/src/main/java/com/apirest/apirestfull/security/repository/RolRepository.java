package com.apirest.apirestfull.security.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apirest.apirestfull.security.entity.Rol;
import com.apirest.apirestfull.security.enums.RolNombre;


@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
    Optional<Rol> findByRolNombre(RolNombre rolNombre);

}
