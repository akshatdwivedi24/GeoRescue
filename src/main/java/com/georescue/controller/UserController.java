package com.georescue.controller;

import com.georescue.model.User;
import com.georescue.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.ok(null);
        }

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("id", principal.getAttribute("sub"));
        userDetails.put("email", principal.getAttribute("email"));
        userDetails.put("name", principal.getAttribute("name"));
        userDetails.put("picture", principal.getAttribute("picture"));

        return ResponseEntity.ok(userDetails);
    }
} 