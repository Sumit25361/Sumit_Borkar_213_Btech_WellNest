package com.wellnest.controller;

import com.wellnest.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/match-trainers")
@CrossOrigin(origins = "*")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping
    public ResponseEntity<?> matchTrainers(@RequestBody Map<String, Object> request) {
        List<String> goals = (List<String>) request.get("goals");
        String availability = (String) request.get("availability");
        
        try {
            List<Map<String, Object>> matches = trainerService.matchTrainers(goals, availability);
            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false));
        }
    }
}
