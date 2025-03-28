package com.georescue.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.oauth2.core.user.OAuth2User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final byte[] jwtKey = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/", "/auth/**", "/oauth2/**", "/login/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .oauth2Login()
                .successHandler((request, response, authentication) -> {
                    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                    
                    // Generate JWT token
                    String token = Jwts.builder()
                        .setSubject(oauth2User.getAttribute("email"))
                        .claim("name", oauth2User.getAttribute("name"))
                        .claim("email", oauth2User.getAttribute("email"))
                        .signWith(Keys.hmacShaKeyFor(jwtKey))
                        .compact();

                    // Create response with user info and token
                    Map<String, Object> responseData = new HashMap<>();
                    responseData.put("token", token);
                    responseData.put("name", oauth2User.getAttribute("name"));
                    responseData.put("email", oauth2User.getAttribute("email"));

                    // Redirect to frontend with data
                    String redirectUrl = String.format("http://localhost:5173/auth/callback?token=%s&name=%s&email=%s",
                        token,
                        oauth2User.getAttribute("name"),
                        oauth2User.getAttribute("email"));
                    
                    response.sendRedirect(redirectUrl);
                })
                .failureUrl("http://localhost:5173/login?error=true")
                .authorizationEndpoint()
                    .baseUri("/oauth2/authorize")
                    .and()
                .redirectionEndpoint()
                    .baseUri("/oauth2/callback/*")
                    .and()
                .userInfoEndpoint();

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Vite default port
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
} 