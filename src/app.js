import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

/* express app */
const app = express();

/* middlewares */
app.use(cors());
app.use(express.json());

/* routes */
//root
app.get('/', (req, res) => {
    res.json({ message: 'Church Management API is running.' });
});

/* additional routes */
// member routes
import memberRouter from './routes/memberRouter.js';
app.use('/api', memberRouter);

// user routes
import userRouter from './routes/userRouter.js';
app.use('/api', userRouter);


/* export app */
export default app;
