import express from 'express';
import User from '../controllers/userController.js';

import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for User */

// Create a new user
router.post('/users/create', auth, User.createUser);

// Get all users
router.get('/users/get-all', auth, User.getAllUsers);

// Get user by ID
router.get('/users/get/:id', auth, User.getUserById);

// Update user by ID
router.put('/users/update/:id', auth, User.updateUser);

// Delete user by ID (soft delete)
router.delete('/users/delete/:id', auth, User.deleteUser);

// Activate user by ID
router.patch('/users/activate/:id', auth, User.activateUser);

// Delete user by ID (hard delete)
router.delete('/users/delete/:id/hard', auth, User.hardDeleteUser);

// Login user
router.post('/users/login', User.loginUser);

export default router;
