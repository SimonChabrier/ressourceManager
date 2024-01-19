const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User  = require('../models/user'); 
const passwordEncoder = require('./passwordEncoder');
const jwt = require('jsonwebtoken');
// Configuration de la stratégie locale de Passport
// username est la clé utilisée pour récupérer la valeur de l'email dans le corps de la requête
// c'est défini dans LocalStrategy je dois pouvoir le changer... 
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { email : username }, logging: console.log });
    if (!user) {
      return done(null, false, { message: 'email incorrect' });
    }
    const checkPasswordMatch = await passwordEncoder.comparePassword(password, user.password);
    if (!checkPasswordMatch) {
      return done(null, false, { message: 'Mot de passe incorrect' });
    }
    // if user is found and password is right create a token 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    user.token = token;
    return done(null, user);

  } catch (error) {
    console.error(error);
    return done(error);
  }
}));
// Serialise user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// deserialiser user from session 
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
