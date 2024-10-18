package com.apirest.apirestfull.security.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        // Obtener el usuario autenticado desde el contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Verificar si el usuario está autenticado
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>(new Mensaje("Usuario no autenticado"), HttpStatus.UNAUTHORIZED);
        }
        // Obtener el nombre de usuario autenticado
        String nombreUsuario = authentication.getName();

        // Buscar el usuario en la base de datos por su nombre de usuario
        Usuario usuario = usuarioService.getByNombreUsuario(nombreUsuario)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado"));

        // Devolver el perfil del usuario autenticado
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Usuario> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) 
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        
        if (usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        
        if (usuarioService.existsByEmail(nuevoUsuario.getEmail()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        
        // Crear el nuevo usuario
        Usuario usuario = new Usuario(
                nuevoUsuario.getNombre(), 
                nuevoUsuario.getNombreUsuario(), 
                nuevoUsuario.getEmail(),
                passwordEncoder.encode(nuevoUsuario.getPassword())
        );
    
        // Asignar roles
        Set<Rol> roles = new HashSet<>();
        if (nuevoUsuario.getRoles().contains(RolNombre.ROLE_ADMIN)) {
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_ADMIN).get());
        } else {
            roles.add(rolService.getByRolNombre(RolNombre.ROLE_USER).get());
        }
    
        usuario.setRoles(roles);
        usuarioService.save(usuario);
        
        // Devolver el objeto Usuario registrado
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }
    
    

    // Endpoint para el login
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult, HttpServletResponse response) {
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
            // JwtDto jwtDto = new JwtDto(jwt);

            // Crear una cookie y establecer el token
            Cookie cookie = new Cookie("token", jwt);
            cookie.setHttpOnly(false); // Evita el acceso desde JavaScript
            cookie.setSecure(true); // Solo se envía en solicitudes HTTPS
            cookie.setMaxAge(24 * 60 * 60); // Caducidad de la cookie (1 día en este caso)
            cookie.setPath("/"); // Disponible en toda la aplicación
    
            response.addCookie(cookie); // Añadir la cookie a la respuesta
            return new ResponseEntity<>(jwt, HttpStatus.OK);
            // return new ResponseEntity<>(new Mensaje("Login exitoso"), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<Mensaje>(new Mensaje("Credenciales incorrectas"), HttpStatus.UNAUTHORIZED);
        }
    }

    private Set<String> invalidTokens = new HashSet<>();
    //Endpoint logout
    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody JwtDto jwtDto) {
        // agregamos el token a la lista de tokens invalidos
        // System.out.println(jwtDto.getToken());
        invalidTokens.add(jwtDto.getToken());
        return new ResponseEntity<>(new Mensaje("Logout exitoso"), HttpStatus.OK);
    }

    @PostMapping("/verify-token")
    public ResponseEntity<Mensaje> verifyToken(@RequestBody JwtDto jwtDto) {
        try {
            // Verifica si el token es válido
            if (jwtProvider.validateToken(jwtDto.getToken())) {
                // logger.info(jwtDto.getToken());
                return new ResponseEntity<>(new Mensaje("Token válido"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Mensaje("Token inválido o expirado"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje("Error al verificar el token"), HttpStatus.BAD_REQUEST);
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
