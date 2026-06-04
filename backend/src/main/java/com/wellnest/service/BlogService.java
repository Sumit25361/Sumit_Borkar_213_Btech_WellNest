package com.wellnest.service;

import com.wellnest.model.Blog;
import com.wellnest.model.Comment;
import com.wellnest.repository.BlogRepository;
import com.wellnest.repository.CommentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }

    public List<Comment> getCommentsByBlogId(String blogId) {
        return commentRepository.findByBlogIdOrderByCreatedAtDesc(blogId);
    }

    public Blog saveBlog(Blog blog) {
        if (blog.getId() == null) {
            blog.setId("b" + System.currentTimeMillis());
        }
        if (blog.getLikes() == null) {
            try {
                blog.setLikes(objectMapper.writeValueAsString(new ArrayList<String>()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return blogRepository.save(blog);
    }

    public Blog updateBlog(String id, Blog blogDetails, String authorEmail) {
        Optional<Blog> blogOpt = blogRepository.findByIdAndAuthorEmail(id, authorEmail);
        if (blogOpt.isPresent()) {
            Blog blog = blogOpt.get();
            blog.setTitle(blogDetails.getTitle());
            blog.setContent(blogDetails.getContent());
            blog.setCategory(blogDetails.getCategory());
            blog.setTags(blogDetails.getTags());
            return blogRepository.save(blog);
        }
        return null; // Handle with exception later
    }

    public boolean deleteBlog(String id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<String> toggleLike(String id, String email) {
        Optional<Blog> blogOpt = blogRepository.findById(id);
        if (blogOpt.isPresent()) {
            Blog blog = blogOpt.get();
            try {
                List<String> likes = objectMapper.readValue(blog.getLikes(), List.class);
                if (likes.contains(email)) {
                    likes.remove(email);
                } else {
                    likes.add(email);
                }
                blog.setLikes(objectMapper.writeValueAsString(likes));
                blogRepository.save(blog);
                return likes;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public Comment addComment(String blogId, Comment comment) {
        comment.setId("c" + System.currentTimeMillis());
        comment.setBlogId(blogId);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }
}
