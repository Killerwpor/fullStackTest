const e = require('cors');
const Sequelize = require('sequelize');

const userModel= require('./models/users');

const sequelize= new Sequelize('KS3ULJZWQE', 'KS3ULJZWQE', 'V9I0nFbyZB',{
    host: 'remotemysql.com',
    dialect: 'mysql'
})

const User=userModel(sequelize, Sequelize);

sequelize.sync({
    force: false
}).then(()=>{
    console.log("Tablas sincronizadas")
})

module.exports= {
    User
}