// middleware custom use passport to check if user is authenticated

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return reslocals.message = "Utilisateur non authentifié";
    return res.status(401).json({ message: 'Utilisateur non authentifié' });
  }

  module.exports = isAuthenticated;
  