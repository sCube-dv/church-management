import express from 'express';
import User from '../controllers/userController.js';

const router = express.Router();

/* routes for User */

// Create a new user
router.post('/users', User.createUser);
// Get all users
router.get('/users', User.getAllUsers);

export default router;