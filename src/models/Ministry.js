import db from "../config/db.js";

const Ministry = db.sequelize.define(
    'tb_ministries',
    {
        id_ministry: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        name: {
            type: db.Sequelize.STRING(50),
            allowNull: false,
        },
        description: {
            type: db.Sequelize.TEXT,
            allowNull: true,
        },
        is_active: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: true,
        },
        id_member: { /* expliciting the relationship with tb_members */
            type: db.Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'tb_members',
                key: 'id_member'
            }
        }
    }
);

export default Ministry;
