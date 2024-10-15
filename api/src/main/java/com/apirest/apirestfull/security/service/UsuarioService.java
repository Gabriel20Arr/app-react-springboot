package com.apirest.apirestfull.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirest.apirestfull.security.entity.Usuario;
import com.apirest.apirestfull.security.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;
    
        public Optional<Usuario> getByNombreUsuario(String nombreUsuario){
            return usuarioRepository.findByNombreUsuario(nombreUsuario);
        }
    
        public boolean existsByNombreUsuario(String nombreUsuario){
            return usuarioRepository.existsByNombreUsuario(nombreUsuario);
        }
    
        public boolean existsByEmail(String email){
            return usuarioRepository.existsByEmail(email);
        }

        public void save(Usuario usuario){
            usuarioRepository.save(usuario);
        }
}

