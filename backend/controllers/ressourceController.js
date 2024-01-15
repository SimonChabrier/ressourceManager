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

  // creer une ressource et l'associer à un user
  createRessource: async (req, res) => {
    const { title, description, code, userId } = req.body;
    try {
      const newRessource = await Ressource.create({ title, description, code, userId });
      res.json(newRessource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  getRessourceById: async (req, res) => {
    const { id } = req.params;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).send('Ressource non trouvée');
      }
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  // get ressources by user id
  getRessourceByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const ressource = await Ressource.findAll({ where: { userId } });
      if (!ressource) {
        return res.status(404).send('Ressource non trouvée');
      }
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  updateRessource: async (req, res) => {
    const { id } = req.params;
    const { title, description, code } = req.body;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).send('Ressource non trouvée');
      }
      ressource.title = title;
      ressource.description = description;
      ressource.code = code;
      await ressource.save();
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  deleteRessource: async (req, res) => {
    const { id } = req.params;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).send('Ressource non trouvée');
      }
      await ressource.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  // Ajoutez d'autres méthodes en fonction de vos besoins
};

module.exports = ressourceController;
