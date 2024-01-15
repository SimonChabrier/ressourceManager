const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/ressourceController');

// Récupérer toutes les ressources
router.get('/', ressourceController.getAllRessources);

// Créer une nouvelle ressource
router.post('/', ressourceController.createRessource);

// Mettre à jour une ressource
router.patch('/:id', ressourceController.updateRessource);

// Supprimer une ressource
router.delete('/:id', ressourceController.deleteRessource);


module.exports = router;
