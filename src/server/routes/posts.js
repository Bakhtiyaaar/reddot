import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Пост не найден" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Некорректный ID или ошибка сервера" });
    }
});

router.post('/', async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || content.trim() === "") {
        return res.status(400).json({ message: "Данные не должны быть пустыми" }); 
    }

    const safeContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
    const safeTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const post = new Post({
        title: safeTitle,     
        content: safeContent,  
        author: author || "Аноним" 
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const { text, author } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Текст комментария обязателен" }); 
        }

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Пост не найден" }); 

        const safeComment = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const newComment = {
            text: safeComment,
            author: author || "Аноним",
            createdAt: new Date()
        };

        post.comments.push(newComment); 
        await post.save(); 
        res.status(201).json(post); 
    } catch (err) {
        res.status(500).json({ message: "Ошибка при добавлении комментария" });
    }
});
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { returnDocument: 'after' } 
        );
        
        if (!post) return res.status(404).json({ message: "Пост не найден" });
        
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обработке лайка" });
    }
});

export default router;