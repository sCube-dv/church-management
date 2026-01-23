import Ministry from '../models/Ministry.js';

/* MinistryService - Logic to manage ministries */
class MinistryService {

    // Create a new ministry
    static async createMinistry(ministryData) {
        const { name, description, id_member } = ministryData;

        const newMinistry = await Ministry.create({
            name,
            description,
            id_member
        });

        return newMinistry;
    }

    // List all ministries
    static async getAllMinistries() {
        const ministries = await Ministry.findAll({
            where: { is_active: true }
        });
        return ministries;
    }

    // Get ministry by id
    static async getMinistryById(ministryId) {
        const ministry = await Ministry.findOne({
            where: {
                id_ministry: ministryId,
                is_active: true
            }
        });
        return ministry;
    }

    // Update ministry
    static async updateMinistry(updateData) {
        const { id_ministry, ministryData } = updateData;

        const ministry = await Ministry.findOne({
            where: {
                id_ministry: id_ministry,
                is_active: true
            }
        });

        if (!ministry) return null;

        await Ministry.update(ministryData, {
            where: { id_ministry: id_ministry }
        });

        return await Ministry.findOne({ where: { id_ministry: id_ministry } });
    }

    // Soft delete
    static async deleteMinistry(id_ministry) {
        const ministry = await Ministry.findOne({
            where: { id_ministry: id_ministry, is_active: true }
        });

        if (!ministry) return null;

        await Ministry.update({ is_active: false }, {
            where: { id_ministry: id_ministry }
        });

        return ministry;
    }

    // Activate
    static async activateMinistry(id_ministry) {
        const ministry = await Ministry.findOne({
            where: { id_ministry: id_ministry, is_active: false }
        });

        if (!ministry) return null;

        await Ministry.update({ is_active: true }, {
            where: { id_ministry: id_ministry }
        });

        return ministry;
    }

    // Hard delete
    static async hardDeleteMinistry(id_ministry) {
        const ministry = await Ministry.findOne({ where: { id_ministry: id_ministry } });
        if (!ministry) return null;

        await Ministry.destroy({ where: { id_ministry: id_ministry } });
        return true;
    }
}

export default MinistryService;
