const Sequelize = require('sequelize');
const sequelize = new Sequelize('appointmentbooking','root','Manju1352@Microsoft',{
    dialect:'mysql',
    host:'localhost',
    port: '3306'
})

module.exports = sequelize;