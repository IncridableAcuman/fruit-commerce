package com.app.backend.services;

import com.app.backend.utils.JWTUtil;
import com.app.backend.utils.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final MailUtil mailUtil;
    private final JWTUtil jwtUtil;
    private final UserService userService;

}
