import db from "../config/db.js";

const Member = db.sequelize.define(
    'tb_members',
    {
        id_member: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        name: {
            type: db.Sequelize.STRING(100),
            allowNull: false,
        },
        cpf: {
            type: db.Sequelize.STRING(11),
            allowNull: false,
            unique: true,
        },
        birth_date: {
            type: db.Sequelize.DATEONLY,
            allowNull: false,
        },
        baptism_date: {
            type: db.Sequelize.DATEONLY,
            allowNull: true,
            defaultValue: null,
        },
        phone: {
            type: db.Sequelize.STRING(15),
            allowNull: false,
        },
        status: {
            type: db.Sequelize.ENUM('active', 'inactive', 'visitor'),
            defaultValue: 'active',
        },
        id_user: { /* foreign key */
            type: db.Sequelize.UUID,
            allowNull: true,
            defaultValue: 'id_userprofile_member',
            references: {
                model: 'tb_users',
                key: 'id_user'
            }
        }
    }
);

export default Member;
