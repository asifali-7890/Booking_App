import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import userRoute from './routes/users.js';
import roomRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB...');
    } catch (error) {
        throw Error(error.message);
    }
}

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected...');
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected...');
})



//middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/users', userRoute);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        success: false,
        status: err.status,
        error: err.message || 'Something went wrong!',
        stack: err.stack || 'This is a error stack...'
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to Home Page!');
});

app.listen(4001, () => {
    connectDB();
    console.log('Connected to Backend...');
});