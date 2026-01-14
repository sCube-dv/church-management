import express from 'express';

const router = express.Router();

// Example member route
router.get('/members', (req, res) => {
    res.json({ message: 'List of members' });
});

export default router;
