import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const questionGroupModel = connectDB.define(
  "sm_question_groups",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "sm_question_groups",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

questionGroupModel.associations = (models) => {
  questionGroupModel.hasMany(models.Question_Bank, {
    foreignKey: "id",
  });
};

export default questionGroupModel;
