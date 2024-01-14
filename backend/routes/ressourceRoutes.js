const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/ressourceController');

// Exemple de route pour récupérer toutes les ressources
router.get('/', ressourceController.getAllRessources);

// Exemple de route pour créer une nouvelle ressource
router.post('/', ressourceController.createRessource);

// Ajoutez d'autres routes en fonction de vos besoins

module.exports = router;
