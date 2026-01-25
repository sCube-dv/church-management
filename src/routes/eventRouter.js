import express from 'express';
import Event from '../controllers/eventController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/* routes for Event */

// Create a new event
router.post('/events/create', auth, Event.createEvent);

// Get all events
router.get('/events/get-all', Event.getAllEvents);

// Get event by ID
router.get('/events/get/:id', Event.getEventById);

// Update event by ID
router.put('/events/update/:id', auth, Event.updateEvent);

// Delete event by ID (soft delete)
router.delete('/events/delete/:id', auth, Event.deleteEvent);

// Activate event by ID
router.patch('/events/activate/:id', auth, Event.activateEvent);

// Delete event by ID (hard delete)
router.delete('/events/delete/:id/hard', auth, Event.hardDeleteEvent);

export default router;
