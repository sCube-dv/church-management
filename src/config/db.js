import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/* database credentials from .env */
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT || 3306;

/* database config object */
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT,
        timezone: '-03:00'
    }
);

/* connection testing */
try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
} catch (error) {
    console.error("Database connection failed: ", error);
}

export default { sequelize, Sequelize };
