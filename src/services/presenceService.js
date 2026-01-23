import Presence from '../models/Presence.js';

/* PresenceService - Logic to manage presences */
class PresenceService {

    // Record presence
    static async createPresence(presenceData) {
        const { presence_date, observation, id_member, id_event } = presenceData;

        const newPresence = await Presence.create({
            presence_date,
            observation,
            id_member,
            id_event
        });

        return newPresence;
    }

    // List all
    static async getAllPresences() {
        const presences = await Presence.findAll({
            where: { is_active: true }
        });
        return presences;
    }

    // Get by id
    static async getPresenceById(id_presence) {
        const presence = await Presence.findOne({
            where: { id_presence: id_presence, is_active: true }
        });
        return presence;
    }

    // Update
    static async updatePresence(updateData) {
        const { id_presence, presenceData } = updateData;

        const presence = await Presence.findOne({
            where: { id_presence: id_presence, is_active: true }
        });

        if (!presence) return null;

        await Presence.update(presenceData, {
            where: { id_presence: id_presence }
        });

        return await Presence.findOne({ where: { id_presence: id_presence } });
    }

    // Soft delete
    static async deletePresence(id_presence) {
        const presence = await Presence.findOne({
            where: { id_presence: id_presence, is_active: true }
        });

        if (!presence) return null;

        await Presence.update({ is_active: false }, {
            where: { id_presence: id_presence }
        });

        return presence;
    }

    // Activate
    static async activatePresence(id_presence) {
        const presence = await Presence.findOne({
            where: { id_presence: id_presence, is_active: false }
        });

        if (!presence) return null;

        await Presence.update({ is_active: true }, {
            where: { id_presence: id_presence }
        });

        return presence;
    }

    // Hard delete
    static async hardDeletePresence(id_presence) {
        const presence = await Presence.findOne({ where: { id_presence: id_presence } });
        if (!presence) return null;

        await Presence.destroy({ where: { id_presence: id_presence } });
        return true;
    }
}

export default PresenceService;
