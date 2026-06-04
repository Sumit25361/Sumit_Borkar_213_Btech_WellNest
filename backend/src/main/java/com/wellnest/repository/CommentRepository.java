package com.wellnest.repository;

import com.wellnest.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByBlogIdOrderByCreatedAtDesc(String blogId);
}

// --- Separator (Writing PostRepository in next call) ---
