import PresenceService from '../services/presenceService.js';

/* class PresenceController */
class PresenceController {

    // Record presence
    static async createPresence(req, res) {
        try {
            const newPresence = await PresenceService.createPresence(req.body);
            res.status(201).json({ message: 'Presença registrada com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all
    static async getAllPresences(req, res) {
        try {
            const presences = await PresenceService.getAllPresences();
            res.status(200).json(presences);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get by ID
    static async getPresenceById(req, res) {
        try {
            const id_presence = req.params.id;
            const presence = await PresenceService.getPresenceById(id_presence);

            if (!presence) {
                return res.status(404).json({ message: 'Registro de presença não encontrado!' });
            }

            res.status(200).json(presence);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update by ID
    static async updatePresence(req, res) {
        try {
            const id_presence = req.params.id;
            const presenceData = req.body;
            const updatedPresence = await PresenceService.updatePresence({ id_presence, presenceData });

            if (!updatedPresence) {
                return res.status(404).json({ message: 'Registro de presença não encontrado!' });
            }

            res.status(200).json({ message: 'Registro de presença atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete by ID (soft delete)
    static async deletePresence(req, res) {
        try {
            const id_presence = req.params.id;
            const deletedPresence = await PresenceService.deletePresence(id_presence);

            if (!deletedPresence) {
                return res.status(404).json({ message: 'Registro de presença não encontrado!' });
            }

            res.status(200).json({ message: 'Registro de presença deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Activate by ID
    static async activatePresence(req, res) {
        try {
            const id_presence = req.params.id;
            const activatedPresence = await PresenceService.activatePresence(id_presence);

            if (!activatedPresence) {
                return res.status(404).json({ message: 'Registro de presença não encontrado!' });
            }

            res.status(200).json({ message: 'Registro de presença ativado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Hard delete by ID
    static async hardDeletePresence(req, res) {
        try {
            const id_presence = req.params.id;
            const hardDeletedPresence = await PresenceService.hardDeletePresence(id_presence);

            if (!hardDeletedPresence) {
                return res.status(404).json({ message: 'Registro de presença não encontrado!' });
            }

            res.status(200).json({ message: 'Registro de presença deletado permanentemente!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default PresenceController;
