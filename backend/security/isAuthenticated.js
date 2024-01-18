// middleware custom use passport to check if user is authenticated

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('Vous n\'êtes pas connecté');
  }

  module.exports = isAuthenticated;
  