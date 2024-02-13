const session = require('express-session');
const passport = require('./authenticate');

// Configuration de la gestion de session
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1 heure
    secure: true, // true en prod
    httpOnly: true,
  },
};

// Utilisation de la gestion de session avec Passport sur l'application Express
// à apeller dans app.js après avoir importé le module session.js
module.exports = (app) => {
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
};
