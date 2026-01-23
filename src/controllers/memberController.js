import MemberService from '../services/memberService.js';

/* class MemberController */

class MemberController {

    // Create a new member
    static async createMember(req, res) {
        try {
            // call the service to create
            const newMember = await MemberService.createMember(req.body);
            res.status(201).json({ message: 'Membro: ' + newMember.name + ' cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end createMember

    // Get all members
    static async getAllMembers(req, res) {
        try {
            // call the service to get all members
            const members = await MemberService.getAllMembers();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getAllMembers

    // Get member by ID
    static async getMemberById(req, res) {
        try {
            const id_member = req.params.id;

            // call the service to get member by id
            const member = await MemberService.getMemberById(id_member);

            if (!member) {
                return res.status(404).json({ message: 'Membro não encontrado!' });
            }

            res.status(200).json(member);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getMemberById

    // Update member by ID
    static async updateMember(req, res) {
        try {
            const id_member = req.params.id;
            const memberData = req.body;

            // call the service to update member by id
            const updatedMember = await MemberService.updateMember({ id_member, memberData });

            if (!updatedMember) {
                return res.status(404).json({ message: 'Membro não encontrado!' });
            }

            res.status(200).json({ message: 'Membro ' + updatedMember.name + ' atualizado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end updateMember

    // Delete member by ID (soft delete)
    static async deleteMember(req, res) {
        try {
            const id_member = req.params.id;

            // call the service to delete member by id
            const deletedMember = await MemberService.deleteMember(id_member);

            if (!deletedMember) {
                return res.status(404).json({ message: 'Membro não encontrado!' });
            }

            res.status(200).json({ message: 'Membro ' + deletedMember.name + ' deletado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end deleteMember

    // Activate member by ID
    static async activateMember(req, res) {
        try {
            const id_member = req.params.id;

            // call the service to activate member by id
            const activatedMember = await MemberService.activateMember(id_member);

            if (!activatedMember) {
                return res.status(404).json({ message: 'Membro não encontrado!' });
            }

            res.status(200).json({ message: 'Membro ' + activatedMember.name + ' ativado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end activateMember

    // Delete member by ID (hard delete)
    static async hardDeleteMember(req, res) {
        try {
            const id_member = req.params.id;

            // call the service to hard delete member by id
            const hardDeletedMember = await MemberService.hardDeleteMember(id_member);

            if (!hardDeletedMember) {
                return res.status(404).json({ message: 'Membro não encontrado!' });
            }

            res.status(200).json({ message: 'Membro deletado permanentemente!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end hardDeleteMember

}

export default MemberController;
