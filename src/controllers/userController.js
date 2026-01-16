import UserService from '../services/userService.js';

/* class UserController */

class UserController {

    // Create a new user
    static async createUser(req, res) {
        try {
            // call the service to create new user
            const newUser = await UserService.createUser(req.body);
            res.status(201).json({ message: 'User: ' + newUser.username + ' created successfully!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end createUser

    // Get all users
    static async getAllUsers(req, res) {
        try {
            // call the service to get all users
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getAllUsers

    // Get user by ID

    // Delete user by ID        
}

export default UserController;