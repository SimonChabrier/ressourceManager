const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User  = require('../models/user'); 
const bcrypt = require('bcrypt');
const passwordEncoder = require('./passwordEncoder');

// Configuration de la stratégie locale de Passport
// username est la clé utilisée pour récupérer la valeur de l'email dans le corps de la requête
// c'est défini dans LocalStrategy je dois pouvoir le changer... 
passport.use(new LocalStrategy(async (username, password, done) => {

  try {
    
    const user = await User.findOne({ where: { email : username }, logging: console.log });
 
    if (!user) {
      return done(null, false, { message: 'email incorrect' });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = await passwordEncoder.comparePassword(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Mot de passe incorrect' });
    }

    return done(null, user);

  } catch (error) {
    console.error(error);
    return done(error);
  }
}));

// Configuration de la sérialisation et de la désérialisation de l'utilisateur
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
