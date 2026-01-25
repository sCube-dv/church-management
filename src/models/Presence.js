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
        },
        is_active: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: true,
        },
        id_member: { // Foreign Key
            type: db.Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'tb_members',
                key: 'id_member',
            },
        },
        id_event: { // Foreign Key
            type: db.Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'tb_events',
                key: 'id_event',
            },
        },
    }
);

export default Presence;
