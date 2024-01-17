 // middleware custom pour vérifier si l'utilisateur est connecté

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('Vous n\'êtes pas connecté');
  }
  
  module.exports = isAuthenticated;
  