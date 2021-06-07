const Sequelize = require('sequelize');

console.log('DB host ' + process.env.DB_HOST)
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST
});

module.exports = sequelize;