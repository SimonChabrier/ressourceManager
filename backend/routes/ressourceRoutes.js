const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/ressourceController');

// Récupérer toutes les ressources
router.get('/', ressourceController.getAllRessources);
// Récupérer une ressource par son id
router.get('/:id', ressourceController.getRessourceById);
// récupérer les ressources de l'utilisateur par son id
router.get('/user/:userId', ressourceController.getUserRessources);
// Créer une nouvelle ressource
router.post('/', ressourceController.createRessource);
// Mettre à jour une ressource
router.patch('/:id', ressourceController.updateRessource);
// Supprimer une ressource
router.delete('/:id', ressourceController.deleteRessource);
// Supprimer toutes les ressources
router.delete('/', ressourceController.deleteAllRessources);


module.exports = router;
