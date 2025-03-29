package com.georescue.controller;

import com.georescue.dto.AuthRequest;
import com.georescue.dto.AuthResponse;
import com.georescue.dto.RegisterRequest;
import com.georescue.model.User;
import com.georescue.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody @Valid AuthRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/current")
    public ResponseEntity<AuthResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(AuthResponse.builder()
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .build());
    }
} 