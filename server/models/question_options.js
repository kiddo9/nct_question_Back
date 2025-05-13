import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const questionOptionModel = connectDB.define(
  "sm_question_bank_mu_options",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    active_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    question_bank_id: {
      type: DataTypes.TIME,
      allowNull: true,
      references: {},
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
    tableName: "sm_question_bank_mu_options",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default questionOptionModel;
