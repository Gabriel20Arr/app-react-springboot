package com.apirest.apirestfull.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apirest.apirestfull.security.entity.Rol;
import com.apirest.apirestfull.security.enums.RolNombre;
import com.apirest.apirestfull.security.repository.RolRepository;

@Service
@Transactional
public class RolService {
@Autowired
    RolRepository rolRepository;;

    public Optional<Rol> getByRolNombre(RolNombre rolNombre){
        return rolRepository.findByRolNombre(rolNombre);
    }

    public void save(Rol rol){
        rolRepository.save(rol);
    }
}
