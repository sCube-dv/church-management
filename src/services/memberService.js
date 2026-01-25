import { Member, User, Ministry, Finance } from '../models/index.js';

/* MemberService - Logic to manage members */
class MemberService {

    /* Methods */
    // Create a new member
    static async createMember(memberData) {
        const { name, cpf, birth_date, baptism_date, phone, status, id_user } = memberData;

        const newMember = await Member.create({
            name,
            cpf,
            birth_date,
            baptism_date,
            phone,
            status,
            id_user
        });

        return newMember;
    } // end createMember

    // List all members
    static async getAllMembers() {
        const members = await Member.findAll({
            where: { // Only active members
                status: 'active',
            }
        });
        return members;
    } // end getAllMembers

    // List members by user role
    static async getMembersByRole(role) {
        const members = await Member.findAll({
            where: {
                status: 'active'
            },
            include: [{
                model: User,
                where: {
                    role: role,
                    is_active: true
                },
                attributes: { exclude: ['password'] }
            }]
        });
        return members;
    } // end getMembersByRole

    // List members by ministry
    static async getMembersByMinistry(ministryId) {
        const members = await Member.findAll({
            where: {
                status: 'active'
            },
            include: [{
                model: Ministry,
                where: {
                    id_ministry: ministryId,
                    is_active: true
                }
            }]
        });
        return members;
    } // end getMembersByMinistry

    // List members by finance type (tithe, offering, missions)
    static async getMembersByFinanceType(type) {
        const members = await Member.findAll({
            where: {
                status: 'active'
            },
            include: [{
                model: Finance,
                where: {
                    type: type,
                    is_active: true
                }
            }]
        });
        return members;
    } // end getMembersByFinanceType

    // Get member by id
    static async getMemberById(memberId) {
        const member = await Member.findOne({
            where: {
                id_member: memberId
                // Retorna o membro independente do status, ou adicione filtro se preferir
            }
        });

        return member;
    } // end getMemberById

    // Update member by id
    static async updateMember(updateData) {
        const { id_member, memberData } = updateData;

        const member = await Member.findOne({
            where: {
                id_member: id_member
            }
        });

        if (!member) {
            return null; // Member not found
        }

        await Member.update(memberData, {
            where: {
                id_member: id_member
            }
        });

        return await Member.findOne({
            where: {
                id_member: id_member
            }
        });
    } // end updateMember

    // Delete member by id (soft delete - sets status to inactive)
    static async deleteMember(id_member) {
        const member = await Member.findOne({
            where: {
                id_member: id_member
            }
        });

        if (!member) {
            return null; // Member not found
        }

        // Soft delete by setting status to inactive
        await Member.update({ status: 'inactive' }, {
            where: {
                id_member: id_member
            }
        });

        return member;
    } // end deleteMember

    // Activate member by id (sets status to active)
    static async activateMember(id_member) {
        const member = await Member.findOne({
            where: {
                id_member: id_member,
                status: 'inactive'
            }
        });

        if (!member) {
            return null; // Member not found or already active
        }

        // Activate member by setting status to active
        await Member.update({ status: 'active' }, {
            where: {
                id_member: id_member
            }
        });

        return member;
    } // end activateMember

    // Delete member by id (hard delete)
    static async hardDeleteMember(id_member) {
        const member = await Member.findOne({
            where: {
                id_member: id_member
            }
        });

        if (!member) {
            return null; // Member not found
        }

        // Delete the member record permanently
        await Member.destroy({
            where: {
                id_member: id_member
            }
        });

        return true;
    } // end hardDeleteMember

}

export default MemberService;
