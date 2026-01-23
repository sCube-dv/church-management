import MinistryService from '../services/ministryService.js';

/* class MinistryController */
class MinistryController {

    // Create a new ministry
    static async createMinistry(req, res) {
        try {
            const newMinistry = await MinistryService.createMinistry(req.body);
            res.status(201).json({ message: 'Ministério: ' + newMinistry.name + ' cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all
    static async getAllMinistries(req, res) {
        try {
            const ministries = await MinistryService.getAllMinistries();
            res.status(200).json(ministries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get by ID
    static async getMinistryById(req, res) {
        try {
            const id_ministry = req.params.id;
            const ministry = await MinistryService.getMinistryById(id_ministry);

            if (!ministry) {
                return res.status(404).json({ message: 'Ministério não encontrado!' });
            }

            res.status(200).json(ministry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update by ID
    static async updateMinistry(req, res) {
        try {
            const id_ministry = req.params.id;
            const ministryData = req.body;
            const updatedMinistry = await MinistryService.updateMinistry({ id_ministry, ministryData });

            if (!updatedMinistry) {
                return res.status(404).json({ message: 'Ministério não encontrado!' });
            }

            res.status(200).json({ message: 'Ministério ' + updatedMinistry.name + ' atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete by ID (soft delete)
    static async deleteMinistry(req, res) {
        try {
            const id_ministry = req.params.id;
            const deletedMinistry = await MinistryService.deleteMinistry(id_ministry);

            if (!deletedMinistry) {
                return res.status(404).json({ message: 'Ministério não encontrado!' });
            }

            res.status(200).json({ message: 'Ministério ' + deletedMinistry.name + ' deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Activate by ID
    static async activateMinistry(req, res) {
        try {
            const id_ministry = req.params.id;
            const activatedMinistry = await MinistryService.activateMinistry(id_ministry);

            if (!activatedMinistry) {
                return res.status(404).json({ message: 'Ministério não encontrado!' });
            }

            res.status(200).json({ message: 'Ministério ' + activatedMinistry.name + ' ativado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Hard delete by ID
    static async hardDeleteMinistry(req, res) {
        try {
            const id_ministry = req.params.id;
            const hardDeletedMinistry = await MinistryService.hardDeleteMinistry(id_ministry);

            if (!hardDeletedMinistry) {
                return res.status(404).json({ message: 'Ministério não encontrado!' });
            }

            res.status(200).json({ message: 'Ministério deletado permanentemente!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default MinistryController;
