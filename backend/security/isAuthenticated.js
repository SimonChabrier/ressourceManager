// middleware custom use passport to check if user is authenticated

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.locals.message = "Utilisateur non authentifié";
    res.status(401).json({ message: 'Utilisateur non authentifié' });
  }

  module.exports = isAuthenticated;
  