const e = require("cors");
const Sequelize = require("sequelize");

const userModel = require("./models/users");
const coinModel = require("./models/coins");
const coinUserModel = require("./models/user-coin");

const sequelize = new Sequelize("KS3ULJZWQE", "KS3ULJZWQE", "V9I0nFbyZB", {
  host: "remotemysql.com",
  dialect: "mysql",
});

const User = userModel(sequelize, Sequelize);
const Coin = coinModel(sequelize, Sequelize);
const CoinUser = coinUserModel(sequelize, Sequelize);

User.belongsToMany(Coin, { through: CoinUser });
Coin.belongsToMany(User, { through: CoinUser });

// User.hasMany(coinUser, {
//   foreignKey: {
//     name: "uid",
//     allowNull: false,
//   },
// });

// coinUser.belongsTo(User, {
//   foreignKey: {
//     name: "uid",
//     allowNull: false,
//   },
// });

sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log("Tablas sincronizadas");
  });

module.exports = {
  User,
  Coin,
  CoinUser,
};
