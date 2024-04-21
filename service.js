// write a function to get all table names from the postgres database using sequelize
require("dotenv").config();
async function testConnection() {
  const { Sequelize } = require("sequelize");

  const connection = "postgres://postgres:123456@localhost:5432/eshopdb";
  const sequelize = new Sequelize(process.env.POSTGRESQL_URL || connection);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close(); // Close the database connection when done
  }
}



async function hasPassword() {
  let bcrypt = require("bcrypt");
  const models = require("./models");
  let users = await models.User.findAll();
  let updatedUser = [];
  users.forEach(async (user) => {
    const password = await bcrypt.hash("Demo@123", 8);
    updatedUser.push({
      id: user.id,
      password: password,
    });
    await models.User.bulkCreate(updatedUser, {
      updateOnDuplicate: ["password"],
    });
  });
}
//hasPassword();

async function readData(tableName) {
  const models = require("./models");
  let data = await models[tableName].findAll();
  console.log(
    data.map((item) => {
      // only return email and passowrd
      return { email: item.email, password: item.password };
    })
  );
}

//readData("User");
// write a function to send a post request to the server to login a user

const axios = require("axios");

async function loginUser() {
  try {
    let response = await axios.post("http://localhost:4000/login", {
      email: "",
      password: "",
    });
    console.log(response.data.message);
  } catch (err) {
    console.log(err);
  }
}

async function findX() {
  let res = await fetch("http://localhost:4000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email: "", password: "" })
  });
  let data = await res.json();
  console.log(data);
}

async function registerUser() {
  try {
    let response = await axios.post("http://localhost:4000/user/register", {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
      confirmPassword: "",
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
//registerUser();

async function addUser() {
  let models = require("./models");
  let user = await models.User.create({
    email: "workingatgems@gmail.com",
    password: "Demo@123",
    firstName: "John",
    lastName: "Doe",
    isAdmin: true,
    mobile: "1234567890",
  });
  console.log(user);
}
addUser();