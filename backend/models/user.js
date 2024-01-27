const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ressource = require('./ressource');
const newUserNotification = require('../notifications/mercure');
const paswwwordEncoder = require('../security/passwordEncoder');
const appMails = require('../services/mails');
// const bcrypt = require('bcrypt');

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
    ondeDelete: 'CASCADE',  // si on supprime un user on supprime ses ressources
  },
});
// get user from ressource
Ressource.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    // references: { // optionnel car sequelize le fait automatiquement sur la base du nom du model et de la clé primaire
    //   model: User,
    //   key: 'id',
    // },
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
User.addHook('beforeUpdate', async (user) => {
  if (user.changed('password')) {
    await appMails.sendPasswordMail(user);
    user.password = await paswwwordEncoder.hashPassword(user.password);
  }
});


// after delete truncate ressources and user table
// User.addHook('afterDestroy', async (user) => {
//   await Ressource.destroy({ truncate: true });
//   await User.destroy({ truncate: true });
// });

module.exports = User;
