"use strict";

const models = require("./models"); // Import your Sequelize models

async function seedAddresses() {
  const Address = models.Address; // Assuming you have a model named Address

  // Define the data to be inserted
  const items = [
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

  // Add createdAt and updatedAt fields to each item
  const now = new Date();
  items.forEach((item) => {
    item.createdAt = now;
    item.updatedAt = now;
  });

  try {
    // Insert data into the database using bulkCreate
    await Address.bulkCreate(items);
    console.log("Seed data added successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Call the function to seed the data
seedAddresses();
