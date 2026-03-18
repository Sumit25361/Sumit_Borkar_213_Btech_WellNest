const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const otpStore = {};

let users = [
    { name: 'Admin',        email: 'admin@gmail.com',        password: 'admin123',   role: 'admin'   },
    { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', password: 'trainer123', role: 'trainer', specialty: 'nutrition', goals: ['weight-loss', 'wellness'], availability: 'morning' },
    { name: 'Arjun Mehta',  email: 'arjun.mehta@gmail.com',  password: 'trainer123', role: 'trainer', specialty: 'strength', goals: ['muscle-gain', 'strength'], availability: 'evening' },
    { name: 'Sneha Patel',  email: 'sneha.patel@gmail.com',  password: 'trainer123', role: 'trainer', specialty: 'yoga', goals: ['flexibility', 'wellness'], availability: 'afternoon' },
    { name: 'Ravi Kumar',   email: 'ravi.kumar@gmail.com',   password: 'trainer123', role: 'trainer', specialty: 'cardio', goals: ['weight-loss', 'endurance'], availability: 'morning' },
    { name: 'Ananya Singh', email: 'ananya.singh@gmail.com', password: 'trainer123', role: 'trainer', specialty: 'rehab', goals: ['flexibility', 'rehab'], availability: 'evening' },
    { name: 'Karan Joshi',  email: 'karan.joshi@gmail.com',  password: 'trainer123', role: 'trainer', specialty: 'general', goals: ['wellness', 'fitness'], availability: 'afternoon' },
];

let blogs = [
    {
        id: 'b1',
        title: "5 Tips for Sustainable Weight Loss",
        content: "Discover how to lose weight and keep it off by focusing on small, consistent changes in your nutrition and activity levels...",
        authorName: "Priya Sharma",
        authorEmail: "priya.sharma@gmail.com",
        authorRole: "trainer",
        category: "Nutrition",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: ["admin@gmail.com"],
        tags: ["weight-loss", "nutrition"]
    },
    {
        id: 'b2',
        title: "The Importance of Morning Yoga",
        content: "Starting your day with just 15 minutes of yoga can transform your mental clarity and physical flexibility...",
        authorName: "Sneha Patel",
        authorEmail: "sneha.patel@gmail.com",
        authorRole: "trainer",
        category: "Wellness",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        likes: [],
        tags: ["yoga", "wellness"]
    }
];

let blogComments = [
    {
        id: 'c1',
        blogId: 'b1',
        content: "Great article! Very helpful.",
        authorName: "Rajesh Kumar",
        authorEmail: "rajesh.k@gmail.com",
        createdAt: new Date(Date.now() - 43200000).toISOString(),
    }
];

let posts = [
    {
        id: 'p1',
        content: "Just finished a 10km run! Feeling amazing. Consistency is key! 🏃‍♂️💪",
        authorName: "Arjun Mehta",
        authorEmail: "arjun.mehta@gmail.com",
        authorRole: "trainer",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        likes: ["priya.sharma@gmail.com"]
    },
    {
        id: 'p2',
        content: "Anyone have tips for better sleep hygiene? 😴",
        authorName: "Deepa Patel",
        authorEmail: "deepa.p@gmail.com",
        authorRole: "user",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        likes: []
    }
];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    const otp = generateOTP();
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
    try {
        await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'Password Reset OTP', text: `Your OTP is: ${otp}` });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (record && record.otp === otp && Date.now() < record.expires) {
        delete otpStore[email];
        res.json({ success: true });
    } else res.status(400).json({ success: false });
});

app.post('/api/check-email', (req, res) => res.json({ success: users.some(u => u.email === req.body.email) }));

app.post('/api/register', (req, res) => {
    if (users.find(u => u.email === req.body.email)) return res.status(400).json({ success: false });
    users.push(req.body);
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (user) {
        const { password, ...u } = user;
        res.json({ success: true, user: u });
    } else res.status(401).json({ success: false });
});

app.post('/api/reset-password', (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (user) {
        user.password = req.body.newPassword;
        res.json({ success: true });
    } else res.status(404).json({ success: false });
});

app.get('/api/posts', (req, res) => res.json([...posts].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))));
app.post('/api/posts', (req, res) => {
    const newPost = { id: 'p' + Date.now(), ...req.body, createdAt: new Date().toISOString(), likes: [] };
    posts.unshift(newPost);
    res.json({ success: true, post: newPost });
});
app.post('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ success: false });
    const idx = post.likes.indexOf(req.body.email);
    if (idx === -1) post.likes.push(req.body.email); else post.likes.splice(idx, 1);
    res.json({ success: true, likes: post.likes });
});

app.get('/api/blogs', (req, res) => res.json(blogs));
app.get('/api/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) return res.status(404).json({ success: false });
    res.json({ ...blog, comments: blogComments.filter(c => c.blogId === req.params.id) });
});
app.post('/api/blogs', (req, res) => {
    const newBlog = { id: 'b' + Date.now(), ...req.body, createdAt: new Date().toISOString(), likes: [] };
    blogs.unshift(newBlog);
    res.json({ success: true, blog: newBlog });
});
app.put('/api/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (blog && blog.authorEmail === req.body.authorEmail) {
        Object.assign(blog, req.body);
        res.json({ success: true, blog });
    } else res.status(404).json({ success: false });
});
app.delete('/api/blogs/:id', (req, res) => {
    const idx = blogs.findIndex(b => b.id === req.params.id);
    if (idx !== -1) {
        blogs.splice(idx, 1);
        res.json({ success: true });
    } else res.status(404).json({ success: false });
});
app.post('/api/blogs/:id/like', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) return res.status(404).json({ success: false });
    const idx = blog.likes.indexOf(req.body.email);
    if (idx === -1) blog.likes.push(req.body.email); else blog.likes.splice(idx, 1);
    res.json({ success: true, likes: blog.likes });
});
app.post('/api/blogs/:id/comment', (req, res) => {
    const newComment = { id: 'c' + Date.now(), blogId: req.params.id, ...req.body, createdAt: new Date().toISOString() };
    blogComments.push(newComment);
    res.json({ success: true, comment: newComment });
});

app.post('/api/match-trainers', (req, res) => {
    const { goals, availability } = req.body;
    const matches = users.filter(u => u.role === 'trainer').map(t => {
        let score = (t.goals || []).filter(g => goals.includes(g)).length * 10;
        if (t.availability === availability) score += 5;
        return { ...t, matchScore: score };
    }).filter(t => t.matchScore > 0).sort((a,b) => b.matchScore - a.matchScore);
    res.json(matches);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
