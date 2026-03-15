import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reddot';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected !'))
    .catch(err => console.log('❌ DB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));