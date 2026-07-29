package com.lifestyleai.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lifestyleai.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes());
    }

    public String generateToken(User user) {

    	return Jwts.builder()
    	        .subject(user.getEmail())
    	        .claim("userId", user.getId())
    	        .claim("role", user.getRole().name())
    	        .issuedAt(new Date())
    	        .expiration(new Date(System.currentTimeMillis() + expiration))
    	        .signWith(getSigningKey())
    	        .compact();
    }

    public String extractUsername(String token) {

        try {
            return extractClaims(token).getSubject();
        } catch (Exception ex) {
            return null;
        }
    }

    public boolean isTokenValid(
            String token,
            User user) {

        try {
            return extractUsername(token)
                    .equals(user.getEmail())
                    && !isTokenExpired(token);
        } catch (Exception ex) {
            return false;
        }
    }

    private boolean isTokenExpired(
            String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extractClaims(
            String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    public Long extractUserId(String token) {

        return extractClaims(token)
                .get("userId", Long.class);
    }

    public String extractRole(String token) {

        return extractClaims(token)
                .get("role", String.class);
    }
}