import Finance from '../models/Finance.js';

/* FinanceService - Logic to manage finances */
class FinanceService {

    // Create a new finance launch
    static async createFinance(financeData) {
        const { amount, receipt_date, type, payment_method, id_member } = financeData;

        const newFinance = await Finance.create({
            amount,
            receipt_date,
            type,
            payment_method,
            id_member
        });

        return newFinance;
    }

    // List all
    static async getAllFinances() {
        const finances = await Finance.findAll({
            where: { is_active: true }
        });
        return finances;
    }

    // Get by id
    static async getFinanceById(id_launch) {
        const finance = await Finance.findOne({
            where: { id_launch: id_launch, is_active: true }
        });
        return finance;
    }

    // Update
    static async updateFinance(updateData) {
        const { id_launch, financeData } = updateData;

        const finance = await Finance.findOne({
            where: { id_launch: id_launch, is_active: true }
        });

        if (!finance) return null;

        await Finance.update(financeData, {
            where: { id_launch: id_launch }
        });

        return await Finance.findOne({ where: { id_launch: id_launch } });
    }

    // Soft delete
    static async deleteFinance(id_launch) {
        const finance = await Finance.findOne({
            where: { id_launch: id_launch, is_active: true }
        });

        if (!finance) return null;

        await Finance.update({ is_active: false }, {
            where: { id_launch: id_launch }
        });

        return finance;
    }

    // Activate
    static async activateFinance(id_launch) {
        const finance = await Finance.findOne({
            where: { id_launch: id_launch, is_active: false }
        });

        if (!finance) return null;

        await Finance.update({ is_active: true }, {
            where: { id_launch: id_launch }
        });

        return finance;
    }

    // Hard delete
    static async hardDeleteFinance(id_launch) {
        const finance = await Finance.findOne({ where: { id_launch: id_launch } });
        if (!finance) return null;

        await Finance.destroy({ where: { id_launch: id_launch } });
        return true;
    }
}

export default FinanceService;
