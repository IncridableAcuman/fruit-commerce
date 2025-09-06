    package com.app.backend.services;

    import com.app.backend.dto.*;
    import com.app.backend.entities.User;
    import com.app.backend.exceptions.BadRequestExceptionHandler;
    import com.app.backend.exceptions.NotFoundExceptionHandler;
    import com.app.backend.exceptions.UnAuthorizeExceptionHandler;
    import com.app.backend.utils.CookieUtil;
    import com.app.backend.utils.JWTUtil;
    import com.app.backend.utils.MailUtil;
    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.transaction.Transactional;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.stereotype.Service;



    @Service
    @RequiredArgsConstructor
    public class AuthService {
        private final JWTUtil jwtUtil;
        private final CookieUtil cookieUtil;
        private final UserService userService;
        private final TokenService tokenService;
        private final MailUtil mailUtil;
        @Transactional
        public AuthResponse authResponse(User user,String accessToken,String refreshToken){return new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole(), accessToken, refreshToken);}
        @Transactional
        public AuthResponse register(RegisterRequest request, HttpServletResponse response){
            User user=userService.createUser(request);
            String accessToken= jwtUtil.generateAccessToken(user);
            String refreshToken= jwtUtil.generateRefreshToken(user);
            tokenService.createToken(user,refreshToken);
            cookieUtil.addCookie(refreshToken,response);
            return authResponse(user,accessToken,refreshToken);}
        @Transactional
        public AuthResponse login(AuthRequest request,HttpServletResponse response){
            User user=userService.findUser(request.getEmail());
            userService.validatePassword(request.getPassword(), user.getPassword());
            String accessToken= jwtUtil.generateAccessToken(user);
            String refreshToken= jwtUtil.generateRefreshToken(user);
            tokenService.regenerateToken(user,refreshToken);
            cookieUtil.addCookie(refreshToken,response);
            return  authResponse(user,accessToken,refreshToken);}
        @Transactional
        public AuthResponse refresh(String refreshToken,HttpServletResponse response){
            if (refreshToken==null || refreshToken.isEmpty()) {throw new NotFoundExceptionHandler("Token not found");}
            if (!jwtUtil.validateToken(refreshToken)){throw new BadRequestExceptionHandler("Invalid token or expired");}
            tokenService.findRefreshToken(refreshToken);
            String email=jwtUtil.extractSubject(refreshToken);
            User user=userService.findUser(email);
            tokenService.deleteToken(user);
            String newAccessToken= jwtUtil.generateAccessToken(user);
            String newRefreshToken= jwtUtil.generateRefreshToken(user);
            tokenService.regenerateToken(user,newRefreshToken);
            cookieUtil.addCookie(newRefreshToken,response);
            return  authResponse(user,newAccessToken,newRefreshToken);}
        @Transactional
        public void logout(String refreshToken,HttpServletResponse response){
            if (refreshToken==null || refreshToken.isEmpty()) {throw new NotFoundExceptionHandler("Token not found");}
            if (!jwtUtil.validateToken(refreshToken)){throw new BadRequestExceptionHandler("Invalid token or expired");}
            tokenService.findRefreshToken(refreshToken);
            String email= jwtUtil.extractSubject(refreshToken);
            if (email==null){throw new UnAuthorizeExceptionHandler("Bad authorization");}
            User user=userService.findUser(email);
            tokenService.deleteToken(user);
            cookieUtil.clearCookie(response);}
        @Transactional
        public GetMe getMe(){
            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            return new GetMe(user.getId(),user.getUsername(),user.getRole());}
        @Transactional
        public String forgotPassword(ForgotPasswordRequest request){
            User user = userService.findUser(request.getEmail());
            String token= jwtUtil.generateAccessToken(user);
            String url="http://localhost:5173/reset-password?token="+token;
            mailUtil.sendMail(user.getEmail(), "Reset Password",url);
            return "Reset password link sent to email.";}
        @Transactional
        public String resetPassword(ResetPasswordRequest request){
            if (!jwtUtil.validateToken(request.getToken())){throw new BadRequestExceptionHandler("Token invalid or expired");}
            String email= jwtUtil.extractSubject(request.getToken());
            User user=userService.findUser(email);
            userService.updatePassword(user,request.getPassword());
            return "Password updated successfully.";}
    }
