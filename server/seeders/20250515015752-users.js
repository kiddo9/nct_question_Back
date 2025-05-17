"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Elechi paschal",
        email: "paschalelechi0@gmail.com",
        password: "12345",
        encryptedId: "indhdbdgeuk1iend5ddf9yrebesj",
        roles: 1,
        email_verified: 1,
        otp: 0,
        otpType: "",
        otpExpiryTime: null,
        loggedIn: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: "paschalelechi0@gmail.com",
    });
  },
};
