const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/reset-password', authController.resetPassword);
// si .env est sur prod 
if (process.env.NODE_ENV === 'prod') {
    router.post('/user-info', verifyToken, isAuthenticated, authController.getSessionInfo);
} else {
    router.post('/user-info', verifyToken, authController.getSessionInfo);
}


module.exports = router;
