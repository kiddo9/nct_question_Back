"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Mr paul",
        email: "pauljeremiah259@gmail.com",
        password:
          "$2b$12$Hc2bZWHLM0a6tiEXfs9eXefNiOnMXzL5eDgRv0A3saVdlVWpynale",
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
