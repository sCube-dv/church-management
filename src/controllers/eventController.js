import EventService from '../services/eventService.js';

/* class EventController */

class EventController {

    // Create a new event
    static async createEvent(req, res) {
        try {
            // call the service to create
            const newEvent = await EventService.createEvent(req.body);
            res.status(201).json({ message: 'Evento: ' + newEvent.title + ' cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end createEvent

    // Get all events
    static async getAllEvents(req, res) {
        try {
            // call the service to get all events
            const events = await EventService.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getAllEvents

    // Get event by ID
    static async getEventById(req, res) {
        try {
            const id_event = req.params.id;

            // call the service to get event by id
            const event = await EventService.getEventById(id_event);

            if (!event) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }

            res.status(200).json(event);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getEventById

    // Update event by ID
    static async updateEvent(req, res) {
        try {
            const id_event = req.params.id;
            const eventData = req.body;

            // call the service to update event by id
            const updatedEvent = await EventService.updateEvent({ id_event, eventData });

            if (!updatedEvent) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }

            res.status(200).json({ message: 'Evento ' + updatedEvent.title + ' atualizado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end updateEvent

    // Delete event by ID (soft delete)
    static async deleteEvent(req, res) {
        try {
            const id_event = req.params.id;

            // call the service to delete event by id
            const deletedEvent = await EventService.deleteEvent(id_event);

            if (!deletedEvent) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }

            res.status(200).json({ message: 'Evento ' + deletedEvent.title + ' deletado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end deleteEvent

    // Activate event by ID
    static async activateEvent(req, res) {
        try {
            const id_event = req.params.id;

            // call the service to activate event by id
            const activatedEvent = await EventService.activateEvent(id_event);

            if (!activatedEvent) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }

            res.status(200).json({ message: 'Evento ' + activatedEvent.title + ' ativado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end activateEvent

    // Delete event by ID (hard delete)
    static async hardDeleteEvent(req, res) {
        try {
            const id_event = req.params.id;

            // call the service to hard delete event by id
            const hardDeletedEvent = await EventService.hardDeleteEvent(id_event);

            if (!hardDeletedEvent) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }

            res.status(200).json({ message: 'Evento deletado permanentemente!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end hardDeleteEvent

}

export default EventController;
