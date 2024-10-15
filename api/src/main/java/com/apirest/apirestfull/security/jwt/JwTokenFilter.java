package com.apirest.apirestfull.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.apirest.apirestfull.security.service.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwTokenFilter extends OncePerRequestFilter{
    private final static Logger logger = LoggerFactory.getLogger(JwTokenFilter.class);

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getToken(req);
            if (token != null && jwtProvider.validateToken(token)) {
                logger.info("Token válido: " + token); // Agregar log
                String username = jwtProvider.getNombreUsuarioFromToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    
                if (userDetails != null) {
                    UsernamePasswordAuthenticationToken auth = 
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    logger.warn("UserDetails no encontrado para: " + username); // Agregar log
                }
            }
        } catch (Exception e) {
            logger.error("fail en el metodo doFilter" + e.getMessage());
        }
        
        filterChain.doFilter(req, res);
    }
    

    private String getToken(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer"))
            return header.replace("Bearer ", "");
        return null;
    }
}
