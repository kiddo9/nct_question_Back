import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";
import roles from "./roles.js";

const usersModel = connectDB.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    encryptedId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: roles,
        key: "id",
      },
    },
    email_verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    otpExpiryTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    otpType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loggedIn: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tokenExpiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  }
);

export default usersModel;
