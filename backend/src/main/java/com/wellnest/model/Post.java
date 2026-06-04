package com.wellnest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @Column(length = 50)
    private String id; // p + timestamp

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name="author_name", nullable = false)
    private String authorName;

    @Column(name="author_email", nullable = false)
    private String authorEmail;

    @Column(name="author_role", nullable = false)
    private String authorRole;

    @Builder.Default
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "json")
    private String likes; // JSON array of emails
}
