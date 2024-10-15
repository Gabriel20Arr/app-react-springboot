package com.apirest.apirestfull.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;  // Importa SecretKey desde javax.crypto

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.apirest.apirestfull.security.dto.JwtDto;
import com.apirest.apirestfull.security.entity.UsuarioPrincipal;
import com.nimbusds.jwt.*;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    // Obtenemos el secret y el expiration desde el application.properties
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;
    
    private final SecretKey secretKey;

    // Constructor donde inicializamos el SecretKey
    public JwtProvider(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Método para generar el token JWT
    public String generateToken(Authentication authentication) {
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
        List<String> roles= usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        // Creamos el token usando la API de jjwt
        return Jwts.builder()
            .setSubject(usuarioPrincipal.getUsername())
            .claim("roles", roles) // Asegúrate de que esto sea una lista de Strings
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + expiration))
            .signWith(SignatureAlgorithm.HS512, secretKey)
            .compact();

    }

    // Método para obtener el username (subject) del token JWT
    public String getNombreUsuarioFromToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Método para validar el token JWT
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Token malformado");
        } catch (UnsupportedJwtException e) {
            logger.error("Token no soportado");
        } catch (ExpiredJwtException e) {
            logger.error("Token expirado");
        } catch (IllegalArgumentException e) {
            logger.error("Token vacío");
        } catch (SignatureException e) {
            logger.error("Fallo en la firma del token");
        }
        return false;
    }

    public String generateRefreshToken(JwtDto jwtDto) throws ParseException {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtDto.getToken());
        } catch (ExpiredJwtException e) {
            JWT jwt = JWTParser.parse(jwtDto.getToken());
            JWTClaimsSet claims = jwt.getJWTClaimsSet();
            String nombreUsuario = claims.getSubject();
            List<String> roles = (List<String>)claims.getClaim("roles");

            return Jwts.builder()
                .setSubject(nombreUsuario)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration)) // Usa refreshExpiration
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
        }
        return null;
    }
}
