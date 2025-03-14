import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432
});

const connectToDb = async () => {
    try {
        await pool.connect();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

export { pool, connectToDb };