const Sequelize = require('sequelize');

const sequelize = new Sequelize( 'mariadb://root@localhost:3306/delilah_resto', {operatorAliases: false});


module.exports = sequelize;