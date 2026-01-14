import Member from '../models/Member.js';

/* class MemberController */

class MemberController {
    // empty constructor
    constructor() { }

    // Create a new member
    async createMember(req, res) {
        try {
            // receive data from req.body
            const { name, cpf, birth_date, baptism_date, phone } = req.body;

            // create new member
            const newMember = await Member.create({
                name,
                cpf,
                birth_date,
                baptism_date,
                phone
            });

            // respond with the created member
            res.status(201).json({ message: 'Membro: ' + newMember.name + ' cadastrado com sucesso!' });
        } catch (error) {
            // handle errors
            res.status(500).json({ error: error.message });
        }
    } // end createMember

    // Get all members
    async getAllMembers(req, res) {
        try {
            const members = await Member.findAll();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getAllMembers

    // Get member by ID

}

export default new MemberController();
