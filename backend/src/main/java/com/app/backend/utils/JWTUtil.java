package com.app.backend.utils;

import com.app.backend.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private final   SecretKey signingKey;
    private final long accessTime;
    private final long refreshTime;


    public JWTUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access_time}") long accessTime,
            @Value("${jwt.refresh_time}") long refreshTime
    ){
        this.signingKey=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTime=accessTime;
        this.refreshTime=refreshTime;
    }

//    generate token
    public String generateToken(User user,Long expirationTime){
        return Jwts
                .builder()
                .subject(user.getEmail())
                .claim("id",user.getId())
                .claim("username",user.getUsername())
                .claim("role",user.getRole())
                .signWith(signingKey)
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
    public boolean validateToken(String token){
        try {
            return validateExpiration(token);
        } catch (RuntimeException e) {
            return false;
        }
    }
//    validate token expiration
    public boolean validateExpiration(String token){
        return extractClaim(token)
                .getExpiration()
                .after(new Date());
    }
}
