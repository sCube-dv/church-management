import db from "../config/db.js";

const Event = db.sequelize.define(
    'tb_events',
    {
        id_event: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        event_name: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        event_date: {
            type: db.Sequelize.DATE,
            allowNull: false,
        },
        location: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: db.Sequelize.TEXT,
            allowNull: true,
        }
    }
);

export default Event;  
