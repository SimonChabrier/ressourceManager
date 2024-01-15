const Ressource = require('./ressource');
const User = require('./user');

// relation avec la table user (1 user peut avoir plusieurs ressources et une ressource appartient à un seul user)
Ressource.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
// relation avec la table ressource (1 user peut avoir plusieurs ressources et une ressource appartient à un seul user)
User.hasMany(Ressource, {
  foreignKey: {
    allowNull: false,
    onDelete: 'cascade',
  },
});
