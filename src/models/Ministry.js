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
        }
    }
);

export default Ministry;
