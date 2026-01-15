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

    // Delete member by ID



}

export default MemberController;
