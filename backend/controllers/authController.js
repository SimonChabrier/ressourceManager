const passport = require('../security/authenticate');

const authController = {
  
  // Contrôleur pour gérer la connexion (authentification)
  login: (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        // Une erreur s'est produite pendant l'authentification
        console.error(err);
        return res.status(500).json({ message: 'Erreur lors de l\'authentification' });
      }
      if (!user) { // L'authentification a échoué, user est false
        return res.status(401).json({ message: 'Identifiants invalides' });
      }
      // L'authentification a réussi
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur lors de la création de la session' });
        }
        // ajouter une clé isLoggedIn à la session de l'utilisateur
        req.session.isLoggedIn = true;
        // ajouter un cookie de session
        req.session.cookie.maxAge = 3600000; // 1 heure
        return res.status(200).json({ message: 'Authentification réussie', user: user });
      });
      
    })(req, res, next);
  },

  // Contrôleur pour gérer la déconnexion
  logout: (req, res) => {
    req.logout(() => { // callback appelé après la déconnexion réussie
      req.session.destroy();
      return res.status(200).json({ message: 'Déconnexion réussie' });
    });
  },

  // session de l'utilisateur connecté
  getUserInfo: (req, res) => {

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
