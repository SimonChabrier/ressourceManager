// vérifie la présence duu token jwt dans le header de la requête
// Path: backend/security/jwtCheck.js

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log('req.headers', req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied' });
    }
    const token = authHeader.substring(7); // Supprimer "Bearer " du début du token sinon la vérification échoue
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // récupérer le userId du token et le stocker dans req.userId
        console.log('decoded', decoded);

        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
