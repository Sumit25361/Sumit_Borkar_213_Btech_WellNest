package com.wellnest.service;

import com.wellnest.model.User;
import com.wellnest.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Map<String, Object>> matchTrainers(List<String> goals, String availability) {
        List<User> trainers = userRepository.findAll().stream()
                .filter(u -> "trainer".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());

        List<Map<String, Object>> matches = new ArrayList<>();

        for (User trainer : trainers) {
            int score = 0;
            List<String> matchReasons = new ArrayList<>();

            try {
                List<String> trainerGoals = trainer.getGoals() != null ? objectMapper.readValue(trainer.getGoals(), List.class) : new ArrayList<>();
                List<String> matchedGoals = trainerGoals.stream()
                        .filter(goals::contains)
                        .collect(Collectors.toList());

                if (!matchedGoals.isEmpty()) {
                    score += matchedGoals.size() * 10;
                    matchedGoals.forEach(g -> matchReasons.add("Shares goal: " + g.replace("-", " ")));
                }

                if (availability != null && availability.equalsIgnoreCase(trainer.getAvailability())) {
                    score += 5;
                    matchReasons.add("Available at your preferred time");
                }

                if (score > 0) {
                    Map<String, Object> match = new java.util.HashMap<>();
                    match.put("id", trainer.getId());
                    match.put("name", trainer.getName());
                    match.put("email", trainer.getEmail());
                    match.put("specialty", trainer.getSpecialty());
                    match.put("availability", trainer.getAvailability());
                    match.put("matchScore", score);
                    match.put("matchReasons", matchReasons);
                    matches.add(match);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        matches.sort((a, b) -> (Integer) b.get("matchScore") - (Integer) a.get("matchScore"));
        return matches;
    }
}
