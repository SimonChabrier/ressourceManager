const bcrypt = require('bcrypt');

// hasher un mot de passe
const passwordEncoder = {

  // le hash est automatisé sur un hook du Model User avec cette fonction
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
