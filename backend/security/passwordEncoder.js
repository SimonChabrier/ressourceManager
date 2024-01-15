const bcrypt = require('bcrypt');

// hasher un mot de passe
const passwordEncoder = {

  // le hash automatisé sur 'beforeCreate' sur le Model User
  hashPassword: async (password) => {
    const saltRounds = 10; // Nombre de tours pour le salage
    return bcrypt.hash(password, saltRounds);
  },

  // comparer un mot de passe avec le hash stocké
  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
  
};

module.exports = passwordEncoder;
