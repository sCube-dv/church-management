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
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        cpf: {
            type: db.Sequelize.STRING,
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
        },
        phone: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: db.Sequelize.ENUM('active', 'inactive', 'visitor'),
            defaultValue: 'active',
        }
    }
);

export default Member;
