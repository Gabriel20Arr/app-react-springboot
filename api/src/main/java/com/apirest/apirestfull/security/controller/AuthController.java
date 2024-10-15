package com.apirest.apirestfull.security.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apirest.apirestfull.dto.Mensaje;
import com.apirest.apirestfull.security.dto.JwtDto;
import com.apirest.apirestfull.security.dto.LoginUsuario;
import com.apirest.apirestfull.security.dto.NuevoUsuario;
import com.apirest.apirestfull.security.entity.Rol;
import com.apirest.apirestfull.security.entity.Usuario;
import com.apirest.apirestfull.security.enums.RolNombre;
import com.apirest.apirestfull.security.jwt.JwtProvider;
import com.apirest.apirestfull.security.service.RolService;
import com.apirest.apirestfull.security.service.UsuarioService;
import java.text.ParseException;

import jakarta.validation.Valid;

@RestController
// @CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    private final static Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/nuevo")
    public ResponseEntity<Mensaje> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) 
            return new ResponseEntity<>(new Mensaje("Verifique los datos introducidos"), HttpStatus.BAD_REQUEST);
        
        if(usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
            return new ResponseEntity<>(new Mensaje("El nombre de usuario " + nuevoUsuario.getNombreUsuario() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
        
        if(usuarioService.existsByEmail(nuevoUsuario.getEmail()))
            return new ResponseEntity<>(new Mensaje("El email " + nuevoUsuario.getEmail() + " ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
        
        // Crear el nuevo usuario
        Usuario usuario = new Usuario(
                nuevoUsuario.getNombre(), 
                nuevoUsuario.getNombreUsuario(), 
                nuevoUsuario.getEmail(),
                passwordEncoder.encode(nuevoUsuario.getPassword())
        );
    
        // Asignar roles
        Set<Rol> roles = new HashSet<>();
        logger.info("Roles recibidos antes del if: " + nuevoUsuario.getRoles());
        // Verificar si el usuario solicitó el rol de admin
        if (nuevoUsuario.getRoles().contains(RolNombre.ROLE_ADMIN)) {
            System.out.println("Rol de admin detectado");
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
        } else {
            // Si no se solicitó el rol de admin, asignar el rol de usuario por defecto
            System.out.println("Rol de user detectado");
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get()); // Asignar rol por defecto
        }
        
        // Antes de la verificación de roles
        logger.info("Roles recibidos: " + nuevoUsuario.getRoles());
        System.out.println("NOMBRE DEL ROL CREADO" + nuevoUsuario.getRoles());
        usuario.setRoles(roles);
    
        usuarioService.save(usuario);
    
        return new ResponseEntity<>(new Mensaje("Usuario registrado con éxito"), HttpStatus.CREATED);
    }
    

    // Endpoint para el login
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return new ResponseEntity<Mensaje>(new Mensaje("Usuario inválido"), HttpStatus.UNAUTHORIZED);
        
        try {
            // Autenticar al usuario
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUsuario.getNombreUsuario(), loginUsuario.getPassword())
            );
    
            // Establecer el contexto de seguridad
            SecurityContextHolder.getContext().setAuthentication(authentication);
    
            // Generar el JWT
            String jwt = jwtProvider.generateToken(authentication);
    
            // Crear DTO con el token y los detalles del usuario
            JwtDto jwtDto = new JwtDto(jwt);
            
            return new ResponseEntity<JwtDto>(jwtDto, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<Mensaje>(new Mensaje("Credenciales incorrectas"), HttpStatus.UNAUTHORIZED);
        }
    }

    // Endpoint para refrescar el token
    @PostMapping("/refresh")
    public ResponseEntity<JwtDto> refresh(@RequestBody JwtDto jwtDto) throws ParseException {
        String token = jwtProvider.generateRefreshToken(jwtDto);
        JwtDto newJwtDto = new JwtDto(token);
        return new ResponseEntity<JwtDto>(newJwtDto, HttpStatus.OK);
    }
}
