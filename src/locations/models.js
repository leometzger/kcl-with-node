const Sequelize = require("sequelize");
const { sequelize } = require("../db");

const Location = sequelize.define(
  "locations",
  {
    timestamp: {
      type: Sequelize.DATE,
      primaryKey: true,
    },
    x: {
      type: Sequelize.DOUBLE,
    },
    y: {
      type: Sequelize.DOUBLE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  { timestamps: false }
);

module.exports = { Location };
