package com.wellnest.controller;

import com.wellnest.model.Post;
import com.wellnest.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        try {
            Post savedPost = postService.createPost(post);
            return ResponseEntity.ok(Map.of("success", true, "post", savedPost));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false));
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable String id, @RequestBody Map<String, String> request) {
        List<String> likes = postService.toggleLike(id, request.get("email"));
        if (likes != null) {
            return ResponseEntity.ok(Map.of("success", true, "likes", likes));
        }
        return ResponseEntity.notFound().build();
    }
}
