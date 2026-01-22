import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { where } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET;

/* UserService - Logic to manage users */
// -> UserProfiles

class UserService {

    /* Methods */
    // Create a new user
    static async createUser(userData) {
        const { username, password, email, role } = userData;

        // Encrypt the password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            role
        });

        return newUser;
    } // end createUser

    // List all users
    static async getAllUsers() {
        const users = await User.findAll({
            where: { // Only active users
                is_active: true
            },
            attributes: { // Exclude password from the result
                exclude: ['password']
            }
        });
        return users;
    } // end getAllUsers

    // List user by id
    static async getUserById(userData) {
        const { id_user } = userData;

        const user = await User.findOne({
            where: {
                id_user: id_user,
                is_active: true
            },
            attributes: {
                exclude: ['password', 'is_active', 'createdAt', 'updatedAt']
            }
        });

        return user;
    } // end getUserById

    // Update user by id
    static async updateUser(updateData) {
        const { id_user, userData } = updateData;

        const user = await User.findOne({
            where: {
                id_user: id_user,
                is_active: true
            }
        });

        if (!user) {
            return null; // User not found
        }

        // If password is being updated, hash it
        if (userData.password) {
            const salt = bcrypt.genSaltSync(10);
            userData.password = bcrypt.hashSync(userData.password, salt);
        }

        await User.update(userData, {
            where: {
                id_user: id_user
            }
        });

        return await User.findOne({
            where: {
                id_user: id_user
            }
        });
    } // end updateUser

    // Delete user by id (soft delete)
    static async deleteUser(id_user) {
        const user = await User.findOne({
            where: {
                id_user: id_user,
                is_active: true
            }
        });

        if (!user) {
            return null; // User not found
        }

        // Soft delete by setting is_active to false
        await User.update({ is_active: false }, {
            where: {
                id_user: id_user
            }
        });

        return true;
    } // end deleteUser

    // Delete user by id (hard delete)
    static async hardDeleteUser(id_user) {
        const user = await User.findOne({
            where: {
                id_user: id_user
            }
        });

        if (!user) {
            return null; // User not found
        }

        // Delete the user record permanently
        await User.destroy({
            where: {
                id_user: id_user
            }
        });

        return true;
    } // end hardDeleteUser

    // Login user
    static async loginUser(loginData) {
        const { username, password } = loginData;

        const user = await User.findOne({
            where: {
                username: username,
                is_active: true
            }
        });

        if (!user) {
            return null; // User not found
        }

        // Compare passwords
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return null; // Invalid password
        }

        // Generate JWT token
        const token = jwt.sign({
            id_user: user.id_user
        }, JWT_SECRET, {
            expiresIn: '1h'
        });
        user.token = token; // Attach token to user object

        return user;
    } // end loginUser

}

export default UserService;