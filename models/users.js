const { Sequelize } = require("sequelize");

module.exports=(sequelize, type)=>{
    return sequelize.define('User',{
userName: {
    type: type.STRING,
    allowNull: false,
    primaryKey: true 
},
nombre: {
    type: type.STRING,
    allowNull: false
},
apellido: {
    type: type.STRING,
    allowNull: false
},
password: {
    type: type.STRING,
    allowNull: false,
    validate: {
        isAlphanumeric:  {
            args: true,
            msg: 'Solo caracteres alfanumericos'
        },
        len: {
            args: [8,32],
            msg: 'Contraseña debe ser de 8 a 32 caracteres'
        } 
    }
},
monedaPreferida: {
    type: type.STRING,
    allowNull: false
}
    })
}