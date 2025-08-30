package com.app.backend.controllers;

import com.app.backend.dto.AuthRequest;
import com.app.backend.dto.AuthResponse;
import com.app.backend.dto.GetMe;
import com.app.backend.dto.RegisterRequest;
import com.app.backend.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

//    register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.register(request,response));
    }
//   login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request,HttpServletResponse response){
        return ResponseEntity.ok(authService.login(request,response));
    }
//    refresh
    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue(name = "refreshToken") String refreshToken,HttpServletResponse response){
        return ResponseEntity.ok(authService.refresh(refreshToken,response));
    }
//    logout

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name = "refreshToken") String refreshToken,HttpServletResponse response){
        authService.logout(refreshToken,response);
        return ResponseEntity.ok("User logged out");
    }
    @GetMapping("/me")
    public ResponseEntity<GetMe> getMe(){
        return ResponseEntity.ok(authService.getMe());
    }
}
