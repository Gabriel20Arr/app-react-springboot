package com.apirest.apirestfull.security;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.apirest.apirestfull.security.jwt.JwtEntryPoint;
import com.apirest.apirestfull.security.jwt.JwTokenFilter;
import com.apirest.apirestfull.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    JwtEntryPoint jwtEntryPoint;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtEntryPoint jwtEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.jwtEntryPoint = jwtEntryPoint;
    }

    @Bean
    public JwTokenFilter jwTokenFilter() {
        return new JwTokenFilter();
    }

    // Encriptación de contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuración del AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Configuración de las reglas de seguridad HTTP
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors // Habilita CORS
                .configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:5173")); // Permite el origen del frontend
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true); // Si estás usando cookies o autenticación basada en JWT
                    return corsConfig;
                })
            )
            .csrf(csrf -> csrf.disable()) // Deshabilita CSRF por simplicidad
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("api/auth/**", "/error").permitAll() // Rutas permitidas sin autenticación
                .requestMatchers(HttpMethod.POST, "api/productos").hasRole("ADMIN") // Solo los ADMIN pueden crear productos
                .requestMatchers("api/productos/**").authenticated() // Las demás acciones sobre productos requieren autenticación
                .anyRequest().authenticated() // Cualquier otra solicitud requiere autenticación
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(jwtEntryPoint) // Manejo de errores
            )
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Sin sesiones en el servidor
            );

        // Agrega el filtro de JWT antes del filtro de autenticación por defecto
        http.addFilterBefore(jwTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configuración global de CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Habilita CORS para todas las rutas
                        .allowedOrigins("http://localhost:5173") // Permite el dominio del frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                        .allowedHeaders("*") // Headers permitidos
                        .allowCredentials(true); // Permitir credenciales (si estás usando JWT o cookies)
            }
        };
    }
}
