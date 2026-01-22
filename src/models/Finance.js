import db from "../config/db.js";

const Finance = db.sequelize.define(
    'tb_finances',
    {
        id_launch: {
            type: db.Sequelize.UUID,
            primaryKey: true,
            defaultValue: db.Sequelize.UUIDV4,
        },
        amount: {
            type: db.Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        receipt_date: {
            type: db.Sequelize.DATE,
            allowNull: false,
        },
        type: {
            type: db.Sequelize.ENUM('tithe', 'offering', 'missions'),
            allowNull: false,
        },
        payment_method: {
            type: db.Sequelize.ENUM('cash', 'credit_card', 'debit_card', 'pix', 'bank_transfer'),
            allowNull: false,
        }
    }
);

export default Finance;
