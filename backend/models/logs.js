const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    method: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ip: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    origin: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    time: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Log;