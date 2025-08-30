package com.app.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;


@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource  corsConfigurationSource(){
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        CorsConfiguration config=new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedMethods(List.of("POST","GET","PUT","DELETE","OPTIONS"));
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setExposedHeaders(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        source.registerCorsConfiguration("/**",config);
        return source;
    }
}
