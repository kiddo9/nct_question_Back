import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const rolesModel = connectDB.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "roles",
  }
);

export default rolesModel;
