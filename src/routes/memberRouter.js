import express from 'express';
import Member from '../controllers/memberController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for Member */

// Create a new member
router.post('/members/create', auth, Member.createMember);

// Get all members
router.get('/members/get-all', auth, Member.getAllMembers);

// Get members by role
router.get('/members/role/:role', auth, Member.getMembersByRole);

// Get members by ministry
router.get('/members/ministry/:id', auth, Member.getMembersByMinistry);

// Get members by finance type (tithe, offering, missions)
router.get('/members/finance/type/:type', auth, Member.getMembersByFinanceType);

// Get member by ID
router.get('/members/get/:id', auth, Member.getMemberById);

// Update member by ID
router.put('/members/update/:id', auth, Member.updateMember);

// Delete member by ID (soft delete)
router.delete('/members/delete/:id', auth, Member.deleteMember);

// Activate member by ID
router.patch('/members/activate/:id', auth, Member.activateMember);

// Delete member by ID (hard delete)
router.delete('/members/delete/:id/hard', auth, Member.hardDeleteMember);

export default router;
