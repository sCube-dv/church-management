import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/* UserService - Logic to manage users */
// -> UserProfiles

class UserService {

    /* Methods */
    // Create a new user
    static async createUser(userData) {
        const { username, password, email, role } = userData;

        // Hash the password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            role
        });

        return newUser;
    }

    // List all users
    static async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

export default UserService;