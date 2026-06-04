package com.wellnest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {
    @Id
    @Column(length = 50)
    private String id; // b + timestamp

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name="author_name", nullable = false)
    private String authorName;

    @Column(name="author_email", nullable = false)
    private String authorEmail;

    @Column(name="author_role", nullable = false)
    private String authorRole;

    private String category;

    @Builder.Default
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "json")
    private String likes; // JSON array of emails

    @Column(columnDefinition = "json")
    private String tags; // JSON array of tags
}
