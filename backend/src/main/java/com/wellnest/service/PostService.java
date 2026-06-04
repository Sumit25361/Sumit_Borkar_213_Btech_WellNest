package com.wellnest.service;

import com.wellnest.model.Post;
import com.wellnest.repository.PostRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(Post post) {
        post.setId("p" + System.currentTimeMillis());
        post.setCreatedAt(LocalDateTime.now());
        if (post.getLikes() == null) {
            try {
                post.setLikes(objectMapper.writeValueAsString(new ArrayList<String>()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return postRepository.save(post);
    }

    public List<String> toggleLike(String id, String email) {
        Optional<Post> postOpt = postRepository.findById(id);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            try {
                List<String> likes = objectMapper.readValue(post.getLikes(), List.class);
                if (likes.contains(email)) {
                    likes.remove(email);
                } else {
                    likes.add(email);
                }
                post.setLikes(objectMapper.writeValueAsString(likes));
                postRepository.save(post);
                return likes;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
