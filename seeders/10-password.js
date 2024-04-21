"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const models = require("../models");
    const bcrypt = require("bcrypt");

    const users = await models.User.findAll();
    //const password = await bcrypt.hash('123456', 8);
    let updatedUser = [];
    for (let user of users) {
      const password = await bcrypt.hash("Demo@123", 8);
      updatedUser.push({
        id: user.id,
        password: password,
      });
    }
    await models.User.bulkCreate(updatedUser, {
      updateOnDuplicate: ["password"],
    });
  },
  
};
