import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const classesModel = connectDB.define(
  "sm_classes",
  {
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass_mark: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false,
    },
    active_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
    academic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
  },
  {
    tableName: "sm_classes",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default classesModel;
