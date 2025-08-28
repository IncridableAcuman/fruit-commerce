package com.app.backend.services;

import com.app.backend.entities.Token;
import com.app.backend.entities.User;
import com.app.backend.exceptions.NotFoundExceptionHandler;
import com.app.backend.repositories.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    @Value("${jwt.refresh_time}")
    private long refreshTime;

    @Transactional
    public void createToken(User user, String refreshToken){
        Token token=new Token();
        token.setUser(user);
        token.setRefreshToken(refreshToken);
        token.setExpiryDate(LocalDateTime.now().plusSeconds(refreshTime));
        tokenRepository.save(token);
    }
    @Transactional
    public void regenerateToken(User user,String refreshToken){
        tokenRepository.findByUser(user).ifPresentOrElse(existingToken->{
            existingToken.setRefreshToken(refreshToken);
            existingToken.setExpiryDate(LocalDateTime.now().plusSeconds(refreshTime));
            tokenRepository.save(existingToken);
        },
                ()->createToken(user,refreshToken)
        );
    }
    @Transactional
    public void findRefreshToken(String refreshToken){
        tokenRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NotFoundExceptionHandler("Token not found"));
    }
    @Transactional
    public Token findUser(User user){
        return tokenRepository.findByUser(user).orElseThrow(()->new NotFoundExceptionHandler("Token not found"));
    }
    @Transactional
    public void deleteToken(User user){
        Token token=findUser(user);
        tokenRepository.delete(token);
    }
}
