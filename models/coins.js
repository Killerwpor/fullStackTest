const { Sequelize } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("Coin", {
    id: {
      type: type.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    simbolo: {
      type: type.STRING,
      allowNull: false,
    },
  });
};
