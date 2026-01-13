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
//root route
app.get('/', (req, res) => {
    res.json({ message: 'Church Management API is running.' });
});

/* additional routes */



export default app;