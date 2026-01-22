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
    static async getUserById(req, res) {
        try {
            const id_user = req.params.id;

            // call the service to get user by id
            const user = await UserService.getUserById({ id_user });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end getUserById

    // Update user by ID
    static async updateUser(req, res) {
        try {
            const id_user = req.params.id;
            const userData = req.body;

            // call the service to update user by id
            const updatedUser = await UserService.updateUser({ id_user, userData });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json({ message: 'Usuário ' + updatedUser.username + ' atualizado com sucesso!' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end updateUser

    // Delete user by ID  (soft delete) 
    static async deleteUser(req, res) {
        try {
            const id_user = req.params.id;

            // call the service to delete user by id
            const deletedUser = await UserService.deleteUser(id_user);
            
            if (!deletedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end deleteUser
    
    // Delete user by ID (hard delete)
    static async hardDeleteUser(req, res) {
        try {
            const id_user = req.params.id;

            // call the service to hard delete user by id
            const hardDeletedUser = await UserService.hardDeleteUser(id_user);
            
            if (!hardDeletedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json({ message: 'Usuário deletado permanentemente com sucesso!' });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end hardDeleteUser

    // Activate user by ID

    // Login user
    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;

            // call the service to authenticate user
            const user = await UserService.loginUser({ username, password });
            
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas!' });
            }
            res.status(200).json({ message: 'Usuário ' + user.username + ' logado com sucesso! Token: ' + user.token });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } // end login user
}

export default UserController;