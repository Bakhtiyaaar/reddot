import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
    try {
        const { userId, communityId } = req.body;

        if (!userId || communityId === undefined) {
            return res.status(400).json({ message: "Недостаточно данных" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        const index = user.communities.indexOf(communityId);
        if (index > -1) {
            user.communities.splice(index, 1);
        } else {
            user.communities.push(communityId);
        }

        await user.save();
        res.json(user.communities); 
    } catch (err) {
        res.status(500).json({ error: "Ошибка при обновлении подписки" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Пароль должен быть не менее 6 символов" });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "Пользователь с таким email или именем уже есть" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            communities: []
        });

        await newUser.save();
        res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Пользователь не найден" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Неверный пароль" });

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'supersecretkey', 
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, communities: user.communities }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;