const Sequelize = require("sequelize");

const host = "user.cni43cw6cvol.eu-central-1.rds.amazonaws.com";
const database = "user";
const username = "username";
const password = "password";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  }
});

module.exports = sequelize;
