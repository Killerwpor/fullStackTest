const { Sequelize } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("UserCoin", {
    favorita: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
