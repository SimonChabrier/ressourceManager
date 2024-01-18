const passport = require('../security/authenticate');
const User  = require('../models/user');

const authController = {
  
  // Manage login
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { 
        return res.status(500).json({ message: 'Erreur lors de l\'authentification' });
      }
      if (!user) { 
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
      // passport and session management
      req.logIn(user, (err) => { 
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la création de la session' });
        }
        req.session.isLoggedIn = true; 
        req.session.cookie.maxAge = 3600000; 
        req.session.jwt = user.token; // add jwt token to session
        return res.status(200).json({ message: 'Authentification réussie', user: user, jwt: user.token });
      });
    })(req, res, next); // call the authenticate method
  },

  // Manage logout
  logout: (req, res) => {
    req.logout(() => { // logout method from passport
      req.session.destroy();
      return res.status(200).json({ message: 'Déconnexion réussie' });
    });
  },

  // Manage register
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const newUser = await User.create({ email, password });
      req.logIn(newUser, (err) => { // Automatically log in the user after registration
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la création de la session' });
        }
        // create session
        req.session.isLoggedIn = true;
        req.session.cookie.maxAge = 3600000;
        return res.status(200).json({ message: 'Inscription réussie', user: newUser });
      });
    } catch (error) {
      res.status(500).json({ message: error.errors.map(err => err.message) });
    }
  },

  // reset password
  resetPassword: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      await user.update({ password });
      return res.status(200).json({ message: 'Mot de passe modifié avec succès' });
    } catch (error) {
      console.log(error);
      //res.status(500).json({ message: error.errors.map(err => err.message) });
    }
  },

  // Manage session info
  getSessionInfo: (req, res) => {
    if (req.isAuthenticated() && req.session.isLoggedIn) { 
      
        const user = req.user;
        const session = req.session;
        const sessionData = { user: user, session: session }

      res.status(200).json(sessionData);

    } else {
      res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
  },
};

module.exports = authController;
