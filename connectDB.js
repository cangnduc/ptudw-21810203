//connect to DB and cosole log the connection status
const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
let models = require("./models");
async function connectDB() { 
    const sequelize = new Sequelize(config.development);
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
connectDB();