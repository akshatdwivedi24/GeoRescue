package com.georescue.service;

import com.georescue.dto.AuthRequest;
import com.georescue.dto.AuthResponse;
import com.georescue.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
} 