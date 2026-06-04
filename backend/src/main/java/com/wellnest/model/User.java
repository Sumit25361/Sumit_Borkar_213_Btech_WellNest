package com.wellnest.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // user, trainer, admin

    private Integer age;
    private Double weight;

    private String specialty;

    @Column(columnDefinition = "json")
    private String goals; // Stored as JSON string, can be parsed to List<String>

    private String availability;
}
