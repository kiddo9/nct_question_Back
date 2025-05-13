import connectDB from "../config/databases.js";
import { DataTypes } from "sequelize";

const questionBankModel = connectDB.define(
  "sm_question_banks",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trueFalse: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    suitable_words: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    number_of_option: {
      type: DataTypes.STRING,
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
    q_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "sm_question_groups",
        key: "id",
      },
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {},
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "sm_question_banks",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

questionBankModel.associations = (models) => {
  questionBankModel.belongsTo(models.question_groups, {
    foreignKey: "q_group_id",
  });
};

export default questionBankModel;
