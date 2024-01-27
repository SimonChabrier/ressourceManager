const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ressource = sequelize.define('ressource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tag: { // eg : documentation, tutorial, article
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tech: { // eg : react, node, express, sequelize, postgresql
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


module.exports = Ressource;
