const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../security/isAuthenticated');  // Importez le middleware d'authentification

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/user-info', isAuthenticated, authController.getSessionInfo);

module.exports = router;
