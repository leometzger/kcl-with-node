const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:password@timescaledb:5432/sample",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {},
    logging: false,
  }
);

module.exports = {
  sequelize,
};
