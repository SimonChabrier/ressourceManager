const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// toutes les routes sont préfixées par /api (cf app.js)
// préfixer les routes par /api/users


// Exemple de route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Exemple de route pour récupérer un utilisateur par son id
router.get('/:id', userController.getUserById);

// Exemple de route pour créer un nouvel utilisateur
router.post('/', userController.createUser);

// Exemple de route pour modifier un utilisateur
router.patch('/:id', userController.patchUser);

// Exemple de route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

// Exemple de route pour récupérer un utilisateur par son username
router.post('/username/:username', userController.findByUserName);

// Exemple de route pour récupérer un utilisateur par son email
router.post('/email/:email', userController.findByEmail);


module.exports = router;
