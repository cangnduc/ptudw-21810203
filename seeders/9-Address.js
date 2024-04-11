"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /*
     firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        address: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        isDefault: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER
    */
    let items = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "John-DOe@gmail.com",
        mobile: "123456789",
        address: "123 Main Street",
        country: "USA",
        city: "New York",
        state: "NY",
        zipCode: "12345",
        isDefault: true,
        userId: 1,
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "JaneDoe@gmail.com",
        mobile: "123456789",
        address: "123 Main Street",
        country: "Vietnam",
        city: "Ho Chi Minh City",
        state: "HCMC",
        zipCode: "70000",
        isDefault: true,
        userId: 2,
      },
      {
        firstName: "John",
        lastName: "Smith",
        email: "smith@gmail.com",
        mobile: "123456789",
        address: "123 Main Street",
        country: "USA",
        city: "New York",
        state: "NY",
        zipCode: "12345",
        isDefault: true,
        userId: 3,
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Addresses", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
