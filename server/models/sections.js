import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const sectionModel = connectDB.define(
  "sm_sections",
  {
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    section_name: {
      type: DataTypes.STRING,
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
    un_academic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    academic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
  },
  {
    tableName: "sm_sections",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default sectionModel;
