package com.app.backend.utils;

import com.app.backend.entities.User;
import com.app.backend.exceptions.UnAuthorizeExceptionHandler;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access_time}")
    private long accessTime;
    @Value("${jwt.refresh_time}")
    private long refreshTime;

    private final SecretKey signingKey;

    public JWTUtil(@Value("${jwt.secret}") String secret){
        this.signingKey=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
//    generate token
    public String generateToken(User user,Long expirationTime){
        return Jwts
                .builder()
                .subject(user.getUsername())
                .claim("id",user.getId())
                .claim("email",user.getEmail())
                .claim("role",user.getRole())
                .signWith(getSigningKey())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+expirationTime))
                .compact();
    }
//    generate access token
    public String generateAccessToken(User user){
        return generateToken(user,accessTime);
    }
//    generate refresh token
    public String generateRefreshToken(User user){
        return generateToken(user,refreshTime);
    }
//    extract
    public Claims extractClaim(String token){
        return Jwts
                .parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
//    extract subject
    public String extractSubject(String token){
        return extractClaim(token).getSubject();
    }
//    validate token
    public void validateToken(String token){
        try {
            Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token);
        } catch (RuntimeException e) {
            throw new UnAuthorizeExceptionHandler(e.getMessage());
        }
    }
//    validate token expiration
    public boolean validateExpiration(String token){
        return extractClaim(token)
                .getExpiration()
                .after(new Date());
    }
}
