import db from "../config/db.js";

const Event = db.sequelize.define(
    'tb_events',
    {
        id_event: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        title: {
            type: db.Sequelize.STRING(100),
            allowNull: false,
        },
        event_date: {
            type: db.Sequelize.DATE,
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

export default Event;
