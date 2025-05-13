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
    dialect: "mysql",
    dialectModule: mysql,
  }
);

connectDB
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed: ", err);
  });

export default connectDB;
