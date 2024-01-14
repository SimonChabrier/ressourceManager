const Ressource = require('../models/ressource');

const ressourceController = {
  getAllRessources: async (req, res) => {
    try {
      const ressources = await Ressource.findAll();
      res.json(ressources);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  createRessource: async (req, res) => {
    const { title, description, code } = req.body;
    try {
      const newRessource = await Ressource.create({ title, description, code });
      res.json(newRessource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  // Ajoutez d'autres méthodes en fonction de vos besoins
};

module.exports = ressourceController;
