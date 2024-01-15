const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ressource = require('./ressource');

const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// User id sur la ressource
User.hasMany(Ressource, {
  foreignKey: {
    allowNull: false,
    onDelete: 'CASCADE',
  },
});
// pour récupérer l'utilisateur sur la/les ressource/s
Ressource.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

// hash password before saving
User.addHook('beforeCreate', async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
