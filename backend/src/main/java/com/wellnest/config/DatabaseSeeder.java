package com.wellnest.config;

import com.wellnest.model.User;
import com.wellnest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            List<TrainerData> trainers = Arrays.asList(
                new TrainerData("Priya Sharma", "priya.sharma@gmail.com", "Weight Loss & Nutrition"),
                new TrainerData("Arjun Mehta", "arjun.mehta@gmail.com", "Strength & Muscle Building"),
                new TrainerData("Sneha Patel", "sneha.patel@gmail.com", "Yoga & Flexibility"),
                new TrainerData("Ravi Kumar", "ravi.kumar@gmail.com", "Cardio & Endurance"),
                new TrainerData("Ananya Singh", "ananya.singh@gmail.com", "Posture & Rehab"),
                new TrainerData("Karan Joshi", "karan.joshi@gmail.com", "General Fitness & Lifestyle")
            );

            for (TrainerData t : trainers) {
                User trainer = userRepository.findByEmail(t.email).orElse(new User());
                trainer.setName(t.name);
                trainer.setEmail(t.email);
                trainer.setPassword(passwordEncoder.encode("trainer123"));
                trainer.setRole("trainer");
                trainer.setSpecialty(t.specialty);
                if (trainer.getAge() == null) trainer.setAge(30);
                if (trainer.getWeight() == null) trainer.setWeight(70.0);
                
                userRepository.save(trainer);
                System.out.println("🌱 Seeded/Updated trainer: " + t.name + " (" + t.email + ")");
            }

            // Seed Admin
            User admin = userRepository.findByEmail("admin@gmail.com").orElse(new User());
            admin.setName("WellNest Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole("admin");
            if (admin.getAge() == null) admin.setAge(35);
            if (admin.getWeight() == null) admin.setWeight(75.0);
            userRepository.save(admin);
            System.out.println("🚀 Seeded/Updated admin: admin@gmail.com");
        };
    }

    private static class TrainerData {
        String name;
        String email;
        String specialty;

        TrainerData(String name, String email, String specialty) {
            this.name = name;
            this.email = email;
            this.specialty = specialty;
        }
    }
}
