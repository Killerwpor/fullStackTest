const { Sequelize } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("Coin", {
    id: {
      type: type.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    symbol: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
