package com.wellnest.repository;

import com.wellnest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    long countByRole(String role);
    
    @Transactional
    void deleteByEmail(String email);
}

// --- Separator (Writing BlogRepository in next call) ---
