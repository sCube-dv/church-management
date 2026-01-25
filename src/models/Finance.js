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

export default Finance;
