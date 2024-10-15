package com.apirest.apirestfull.security.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.apirest.apirestfull.security.entity.Usuario;
import com.apirest.apirestfull.security.entity.UsuarioPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private UsuarioService usuarioService; // Inyección correcta

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar el usuario por nombre de usuario
        Usuario usuario = usuarioService.getByNombreUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        // Construir y devolver el UserDetails utilizando UsuarioPrincipal
        return UsuarioPrincipal.build(usuario);
    }
}

