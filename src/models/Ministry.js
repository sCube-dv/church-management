import db from "../config/db.js";

const Ministry = db.sequelize.define(
    'tb_ministries',
    {
        id_ministry: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        ministry_name: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: db.Sequelize.TEXT,
            allowNull: true,
        }
    }
);

export default Ministry;
