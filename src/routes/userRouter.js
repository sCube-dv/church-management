import express from 'express';
import User from '../controllers/userController.js';

import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for User */

// Create a new user
router.post('/users/create', User.createUser);
// Get all users
router.get('/users/get-all', auth, User.getAllUsers);
// Get user by ID
router.get('/users/get/:id', User.getUserById);
// Update user by ID
router.put('/users/update/:id', User.updateUser);
// Delete user by ID (soft delete)
router.delete('/users/delete/:id', User.deleteUser);
// Delete user by ID (hard delete)
router.delete('/users/delete/:id/hard', User.hardDeleteUser);
// Login user
router.post('/users/login', User.loginUser);

// Additional route to activate a user
// Activate user by ID
// router.patch('/users/:id/activate', User.activateUser);

export default router;