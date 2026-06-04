package com.wellnest.repository;

import com.wellnest.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, String> {
    List<Blog> findAllByOrderByCreatedAtDesc();
    Optional<Blog> findByIdAndAuthorEmail(String id, String authorEmail);
}
