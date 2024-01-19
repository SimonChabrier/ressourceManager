const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ressource = require('./ressource');
const newUserNotification = require('../notifications/mercure');
const paswwwordEncoder = require('../security/passwordEncoder');
const appMails = require('../services/mails');

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
// get ressources from user
User.hasMany(Ressource, {
  foreignKey: {
    allowNull: false,
    onDelete: 'CASCADE',
  },
});
// get user from ressource
Ressource.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
// hash password before saving
User.addHook('beforeCreate', async (user) => {
  user.password = await paswwwordEncoder.hashPassword(user.password);
});
// Notification mercure after user creation
User.addHook('afterCreate', async (user) => {
  await newUserNotification(user)
});


// si mise à jour du mot de passe on envoie le mail 
// de confirmation avec le nouveau mot de passe avant de le hasher
User.addHook('afterUpdate', async (user) => {
  if (user.changed('password')) {
    await appMails.sendPasswordMail(user);
    user.password = await paswwwordEncoder.hashPassword(user.password);
  }
});

module.exports = User;
