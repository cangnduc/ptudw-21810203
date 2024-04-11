let models = require("./models");

models.sequelize.sync({ force: true }).then(() => {
    console.log("Database created successfully");
    process.exit();
}).catch((err) => {
    console.log("Error creating database");
    console.log(err);
    process.exit();
});