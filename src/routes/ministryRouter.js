import express from 'express';
import Ministry from '../controllers/ministryController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for Ministry */

// Create
router.post('/ministries/create', auth, Ministry.createMinistry);

// Get all
router.get('/ministries/get-all', Ministry.getAllMinistries);

// Get by ID
router.get('/ministries/get/:id', Ministry.getMinistryById);

// Update by ID
router.put('/ministries/update/:id', Ministry.updateMinistry);

// Delete (soft)
router.delete('/ministries/delete/:id', auth, Ministry.deleteMinistry);

// Activate
router.patch('/ministries/activate/:id', auth, Ministry.activateMinistry);

// Delete (hard)
router.delete('/ministries/delete/:id/hard', auth, Ministry.hardDeleteMinistry);

export default router;
