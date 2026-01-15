import Member from '../models/Member.js';

/* MemberService - Logic to manage members */

class MemberService {

    // Create a new member
    static async createMember(memberData) {
        const { name, cpf, birth_date, baptism_date, phone } = memberData;

        const newMember = await Member.create({
            name,
            cpf,
            birth_date,
            baptism_date,
            phone
        });

        return newMember;
    }

    // List all members
    static async getAllMembers() {
        const members = await Member.findAll();
        return members;
    }
}

export default MemberService;
