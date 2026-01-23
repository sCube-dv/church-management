import FinanceService from '../services/financeService.js';

/* class FinanceController */
class FinanceController {

    // Create a new finance launch
    static async createFinance(req, res) {
        try {
            const newFinance = await FinanceService.createFinance(req.body);
            res.status(201).json({ message: 'Lançamento financeiro de R$ ' + newFinance.amount + ' cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all
    static async getAllFinances(req, res) {
        try {
            const finances = await FinanceService.getAllFinances();
            res.status(200).json(finances);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get by ID
    static async getFinanceById(req, res) {
        try {
            const id_launch = req.params.id;
            const finance = await FinanceService.getFinanceById(id_launch);

            if (!finance) {
                return res.status(404).json({ message: 'Lançamento financeiro não encontrado!' });
            }

            res.status(200).json(finance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update by ID
    static async updateFinance(req, res) {
        try {
            const id_launch = req.params.id;
            const financeData = req.body;
            const updatedFinance = await FinanceService.updateFinance({ id_launch, financeData });

            if (!updatedFinance) {
                return res.status(404).json({ message: 'Lançamento financeiro não encontrado!' });
            }

            res.status(200).json({ message: 'Lançamento financeiro atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete by ID (soft delete)
    static async deleteFinance(req, res) {
        try {
            const id_launch = req.params.id;
            const deletedFinance = await FinanceService.deleteFinance(id_launch);

            if (!deletedFinance) {
                return res.status(404).json({ message: 'Lançamento financeiro não encontrado!' });
            }

            res.status(200).json({ message: 'Lançamento financeiro deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Activate by ID
    static async activateFinance(req, res) {
        try {
            const id_launch = req.params.id;
            const activatedFinance = await FinanceService.activateFinance(id_launch);

            if (!activatedFinance) {
                return res.status(404).json({ message: 'Lançamento financeiro não encontrado!' });
            }

            res.status(200).json({ message: 'Lançamento financeiro ativado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Hard delete by ID
    static async hardDeleteFinance(req, res) {
        try {
            const id_launch = req.params.id;
            const hardDeletedFinance = await FinanceService.hardDeleteFinance(id_launch);

            if (!hardDeletedFinance) {
                return res.status(404).json({ message: 'Lançamento financeiro não encontrado!' });
            }

            res.status(200).json({ message: 'Lançamento financeiro deletado permanentemente!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default FinanceController;
