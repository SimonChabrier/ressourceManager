const passport = require('../security/authenticate');
const User  = require('../models/user');

const authController = {
  
  // Gérer la connexion (authentification)
  login: (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
      if (err) { // Une erreur s'est produite pendant l'authentification
        return res.status(500).json({ message: 'Erreur lors de l\'authentification' });
      }
      if (!user) { // L'authentification a échoué, user est false
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
  // L'authentification a réussi
      req.logIn(user, (err) => { // Fonction ajoutée par Passport pour connecter l'utilisateur
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la création de la session' });
        }
        req.session.isLoggedIn = true; // ajouter une clé isLoggedIn à la session de l'utilisateur
        req.session.cookie.maxAge = 3600000; // ajouter un cookie de session avec une durée de vie de 1h
        req.session.token = user.token; // ajouter le token d'authentification de l'utilisateur à la session
        return res.status(200).json({ message: 'Authentification réussie', user: user, token: user.token });
      });
      
    })(req, res, next); // appeler la fonction retournée par authenticate
  },

  // Gérer la déconnexion
  logout: (req, res) => {
    req.logout(() => { // callback appelé après la déconnexion réussie
      req.session.destroy();
      return res.status(200).json({ message: 'Déconnexion réussie' });
    });
  },

  // Gérer l'inscription
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      const newUser = await User.create({ email, password });
  
      req.logIn(newUser, (err) => { // connecter l'utilisateur après son inscription
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la création de la session' });
        }
        // on met à jour la session de l'utilisateur
        req.session.isLoggedIn = true;
        req.session.cookie.maxAge = 3600000;
        return res.status(200).json({ message: 'Inscription réussie', user: newUser });
      });

    } catch (error) {
      res.status(500).json({ message: error.errors.map(err => err.message) });
    }
  },

  //Retourne les infos de session de l'utilisateur connecté
  getSessionInfo: (req, res) => {

    if (req.isAuthenticated() && req.session.isLoggedIn) { // si mon middleware isAuthenticated a ajouté une clé isLoggedIn à la session de l'utilisateur

      const user = req.user;
      const session = req.session;

      const sessionData = {
        user: user,
        session: session
      }

      res.status(200).json(sessionData);
    } else {
      // Utilisateur non authentifié
      res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
  },
};

module.exports = authController;
