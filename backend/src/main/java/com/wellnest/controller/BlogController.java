package com.wellnest.controller;

import com.wellnest.model.Blog;
import com.wellnest.model.Comment;
import com.wellnest.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        if (blog.isPresent()) {
            List<Comment> comments = blogService.getCommentsByBlogId(id);
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("id", blog.get().getId());
            response.put("title", blog.get().getTitle());
            response.put("content", blog.get().getContent());
            response.put("authorName", blog.get().getAuthorName());
            response.put("authorEmail", blog.get().getAuthorEmail());
            response.put("authorRole", blog.get().getAuthorRole());
            response.put("category", blog.get().getCategory());
            response.put("createdAt", blog.get().getCreatedAt());
            response.put("likes", blog.get().getLikes());
            response.put("tags", blog.get().getTags());
            response.put("comments", comments);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@RequestBody Blog blog) {
        try {
            Blog savedBlog = blogService.saveBlog(blog);
            return ResponseEntity.ok(Map.of("success", true, "blog", savedBlog));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable String id, @RequestBody Blog blogDetails) {
        Blog updatedBlog = blogService.updateBlog(id, blogDetails, blogDetails.getAuthorEmail());
        if (updatedBlog != null) {
            return ResponseEntity.ok(Map.of("success", true, "blog", updatedBlog));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable String id) {
        boolean success = blogService.deleteBlog(id);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable String id, @RequestBody Map<String, String> request) {
        List<String> likes = blogService.toggleLike(id, request.get("email"));
        if (likes != null) {
            return ResponseEntity.ok(Map.of("success", true, "likes", likes));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> addComment(@PathVariable String id, @RequestBody Comment comment) {
        Comment savedComment = blogService.addComment(id, comment);
        if (savedComment != null) {
            return ResponseEntity.ok(Map.of("success", true, "comment", savedComment));
        }
        return ResponseEntity.status(500).body(Map.of("success", false));
    }
}
