import express from 'express';
import Presence from '../controllers/presenceController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for Presence */

// Create
router.post('/presences/create', auth, Presence.createPresence);

// Get all
router.get('/presences/get-all', auth, Presence.getAllPresences);

// Get by ID
router.get('/presences/get/:id', auth, Presence.getPresenceById);

// Update by ID
router.put('/presences/update/:id', auth, Presence.updatePresence);

// Delete (soft)
router.delete('/presences/delete/:id', auth, Presence.deletePresence);

// Activate
router.patch('/presences/activate/:id', auth, Presence.activatePresence);

// Delete (hard)
router.delete('/presences/delete/:id/hard', auth, Presence.hardDeletePresence);

export default router;
