import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { backupDatabase } from './backup.js';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reddot';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected to Compass!');
        backupDatabase();
    })
    .catch(err => console.log('DB Connection Error:', err));

app.use('/api/auth', authRoutes);

app.use('/api/posts', postRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Упс! Такой страницы не существует" });
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));