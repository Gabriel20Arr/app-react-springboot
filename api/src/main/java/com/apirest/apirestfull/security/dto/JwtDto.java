package com.apirest.apirestfull.security.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtDto {
    private String token;

    public JwtDto(String token) {
        this.token = token;
    }
}
