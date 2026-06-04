package com.wellnest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @Column(length = 50)
    private String id; // c + timestamp

    @Column(name="blog_id", nullable = false)
    private String blogId; // blog + id

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name="author_name", nullable = false)
    private String authorName;

    @Column(name="author_email", nullable = false)
    private String authorEmail;

    @Builder.Default
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}

// --- Separator (Writing to same file if I can, but I should use separate files) ---
