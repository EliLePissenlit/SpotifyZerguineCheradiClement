import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import repositoryRoutes from './routes/repositoryRoutes';

// charge variables .env
dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/repositories', repositoryRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

startServer();

export default app;
