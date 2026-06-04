package com.wellnest.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellnest.model.User;
import com.wellnest.repository.BlogRepository;
import com.wellnest.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        // Return all users, excluding passwords for safety
        List<User> users = userRepository.findAll().stream()
                .peek(user -> user.setPassword(null))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "User not found"));
        }
        
        // Prevent deleting the main admin
        if ("admin@gmail.com".equalsIgnoreCase(email)) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", "Cannot delete the primary administrator"));
        }

        userRepository.deleteByEmail(email);
        return ResponseEntity.ok(Map.of("success", true, "message", "User deleted successfully"));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        long totalUsers = userRepository.countByRole("user");
        long totalTrainers = userRepository.countByRole("trainer");
        long totalBlogs = blogRepository.count();
        
        return ResponseEntity.ok(Map.of(
            "totalUsers", totalUsers + totalTrainers,
            "activeTrainers", totalTrainers,
            "totalBlogs", totalBlogs,
            "systemHealth", "99%"
        ));
    }
}
