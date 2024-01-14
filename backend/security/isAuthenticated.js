// mon middleware pour vérifier si l'utilisateur est connecté
// je peux l'utiliser dans mes routes pour vérifier si l'utilisateur est connecté
// si il est connecté alors je peux lui donner accès à certaines routes...
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('Vous n\'êtes pas connecté');
  }
  
  module.exports = isAuthenticated;
  