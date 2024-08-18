document.addEventListener('DOMContentLoaded', () => {
    loadPosts();

    const sendMessageButton = document.getElementById('sendMessage');
    sendMessageButton.addEventListener('click', sendMessage);
});

function loadPosts() {
    const postsContainer = document.getElementById('posts');
    
    const samplePosts = [
        { user: 'Alice', content: 'Hello world!' },
        { user: 'Bob', content: 'This is my first post!' }
    ];

    samplePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<strong>${post.user}</strong><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatContainer = document.getElementById('chat');

    if (messageInput.value.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = messageInput.value;
        chatContainer.appendChild(messageElement);
        messageInput.value = '';
    }
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Post model
const Post = mongoose.model('Post', new mongoose.Schema({
    user: String,
    content: String
}));

// API endpoint to get posts
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

// API endpoint to create a post
app.post('/api/posts', async (req, res) => {
    const post = new Post({
        user: req.body.user,
        content: req.body.content
    });
    await post.save();
    res.send(post);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

