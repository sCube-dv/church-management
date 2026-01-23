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
// user routes
import userRouter from './routes/userRouter.js';
app.use('/api', userRouter);

// member routes
import memberRouter from './routes/memberRouter.js';
app.use('/api', memberRouter);

// event routes
import eventRouter from './routes/eventRouter.js';
app.use('/api', eventRouter);

// ministry routes
import ministryRouter from './routes/ministryRouter.js';
app.use('/api', ministryRouter);

// finance routes
import financeRouter from './routes/financeRouter.js';
app.use('/api', financeRouter);

// presence routes
import presenceRouter from './routes/presenceRouter.js';
app.use('/api', presenceRouter);



/* export app */
export default app;
