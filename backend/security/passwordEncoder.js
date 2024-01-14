const bcrypt = require('bcrypt');

// hasher un mot de passe
const passwordEncoder = {

  hashPassword: async (password) => {
    const saltRounds = 10; // Nombre de tours pour le salage
    return bcrypt.hash(password, saltRounds);
  },

  // vérifier un mot de passe avec le hash stocké
  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
  
};

module.exports = passwordEncoder;
