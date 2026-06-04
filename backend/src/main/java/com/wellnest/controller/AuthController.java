package com.wellnest.controller;

import com.wellnest.model.User;
import com.wellnest.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null) return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email is required"));
        try {
            authService.sendOTP(email);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (authService.verifyOTP(email, otp)) {
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> request) {
        boolean exists = authService.checkEmail(request.get("email"));
        return ResponseEntity.ok(Map.of("success", exists));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            authService.register(user);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String jwt = authService.login(request.get("email"), request.get("password"));
            Optional<User> user = authService.getUserByEmail(request.get("email"));
            if (user.isPresent()) {
                return ResponseEntity.ok(Map.of("success", true, "token", jwt, "user", user.get()));
            }
            return ResponseEntity.status(401).body(Map.of(
                "success", false, 
                "message", "Account not found. Please register first."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                "success", false, 
                "message", "Invalid email or password. Please register if you haven't yet."
            ));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        boolean success = authService.resetPassword(request.get("email"), request.get("newPassword"));
        return ResponseEntity.ok(Map.of("success", success));
    }
}
