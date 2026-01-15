import db from "../config/db.js";

const Presence = db.sequelize.define(
    'tb_presences',
    {
        id_presence: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        presence_date: {
            type: db.Sequelize.DATE,
            allowNull: false,
            defaultValue: db.Sequelize.NOW,
        },
        observation: {
            type: db.Sequelize.TEXT,
            allowNull: true,
        }
    }
);

export default Presence;
