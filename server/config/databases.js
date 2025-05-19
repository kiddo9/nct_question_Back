import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import mysql from "mysql2";

const connectDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: mysql,
  }
);

(async () => {
  try {
    await connectDB.authenticate();
    console.log("connection sucessfull");
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
})();

export default connectDB;
