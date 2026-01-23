import Event from '../models/Event.js';

/* EventService - Logic to manage events */
class EventService {

    /* Methods */
    // Create a new event
    static async createEvent(eventData) {
        const { title, event_date, description } = eventData;

        const newEvent = await Event.create({
            title,
            event_date,
            description
        });

        return newEvent;
    } // end createEvent

    // List all events
    static async getAllEvents() {
        const events = await Event.findAll({
            where: { // Only active events
                is_active: true
            }
        });
        return events;
    } // end getAllEvents

    // Get event by id
    static async getEventById(eventId) {
        const event = await Event.findOne({
            where: {
                id_event: eventId,
                is_active: true
            }
        });

        return event;
    } // end getEventById

    // Update event by id
    static async updateEvent(updateData) {
        const { id_event, eventData } = updateData;

        const event = await Event.findOne({
            where: {
                id_event: id_event,
                is_active: true
            }
        });

        if (!event) {
            return null; // Event not found
        }

        await Event.update(eventData, {
            where: {
                id_event: id_event
            }
        });

        return await Event.findOne({
            where: {
                id_event: id_event
            }
        });
    } // end updateEvent

    // Delete event by id (soft delete)
    static async deleteEvent(id_event) {
        const event = await Event.findOne({
            where: {
                id_event: id_event,
                is_active: true
            }
        });

        if (!event) {
            return null; // Event not found
        }

        // Soft delete by setting is_active to false
        await Event.update({ is_active: false }, {
            where: {
                id_event: id_event
            }
        });

        return event;
    } // end deleteEvent

    // Activate event by id
    static async activateEvent(id_event) {
        const event = await Event.findOne({
            where: {
                id_event: id_event,
                is_active: false
            }
        });

        if (!event) {
            return null; // Event not found
        }

        // Activate event by setting is_active to true
        await Event.update({ is_active: true }, {
            where: {
                id_event: id_event
            }
        });

        return event;
    } // end activateEvent

    // Delete event by id (hard delete)
    static async hardDeleteEvent(id_event) {
        const event = await Event.findOne({
            where: {
                id_event: id_event
            }
        });

        if (!event) {
            return null; // Event not found
        }

        // Delete the event record permanently
        await Event.destroy({
            where: {
                id_event: id_event
            }
        });

        return true;
    } // end hardDeleteEvent

}

export default EventService;
