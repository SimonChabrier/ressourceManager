const passport = require('../security/authenticate');
const User  = require('../models/user');
const validator = require('../services/validator');
const jwt = require('jsonwebtoken');


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
        req.session.jwt = user.token;
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
        
        req.logIn(newUser, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la création de la session' });
            }
            // Créer la session
            req.session.isLoggedIn = true;
            req.session.cookie.maxAge = 3600000;
            // créer un token jwt pour l'utilisateur et l'ajouter à la session
            newUser.token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            req.session.jwt = newUser.token; // Ajouter le token JWT à la session
            return res.status(200).json({ message: 'Inscription et authentification réussies', user: newUser, jwt: newUser.token });
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.errors.map(err => err.message) });
    }
  },

  // reset password (confirmation mail send from User Model hook)
  resetPassword: async (req, res) => {
    
    const { email, password } = req.body;
    const validate = validator.validateFields({ email, password });
    if(validate.length !== 0){ // si le validateur a trouvé des champs vides
      return res.status(404).json({ message : validate })
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      await user.update({ password });
      
      return res.status(200).json({ message: 'Mot de passe modifié' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.errors.map(err => err.message) });
    }
  },

  // Manage session info
  getSessionInfo: (req, res) => {
    if (req.isAuthenticated() && req.session.isLoggedIn) { 
      
        const user = req.user;
        const session = req.session;
        const sessionData = { user: user, session: session }

      return res.status(200).json({ message: 'Utilisateur authentifié', sessionData });

    } else {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
  },
};

module.exports = authController;
