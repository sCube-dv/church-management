import express from 'express';
import Member from '../controllers/memberController.js';

const router = express.Router();

/* routes for Member */

// Create a new member
router.post('/members', Member.createMember);
// Get all members
router.get('/members', Member.getAllMembers);

export default router;
