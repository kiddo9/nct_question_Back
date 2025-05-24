"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      encryptedId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      roles: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_verified: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      otpExpiryTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      otpType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      loggedIn: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
