const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: true, // active les dates de création et de modification automatiquement gérées par Sequelize
  },
});

module.exports = sequelize
