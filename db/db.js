const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bob', 'bob', 'cat', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
});

module.exports = sequelize