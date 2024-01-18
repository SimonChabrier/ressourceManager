const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/user-info', isAuthenticated, verifyToken, authController.getSessionInfo);

module.exports = router;
