import db from "../config/db.js";

const User = db.sequelize.define(
    'tb_users',
    {
        id_user: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        username: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Validates format of email
            },
        },
        role: {
            type: db.Sequelize.ENUM('admin', 'member', 'guest'),
            defaultValue: 'member',
        },
        is_active: { // Indicates if the user account is active
            type: db.Sequelize.BOOLEAN,
            defaultValue: true,
        }
    }
);

export default User;