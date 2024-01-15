const Ressource = require('../models/ressource');
const User = require('../models/user');

const ressourceController = {
  getAllRessources: async (req, res) => {
    try {
      //const ressources = await Ressource.findAll();
      const ressources = await Ressource.findAll({ include: User });
      if(ressources.length === 0) {
        return res.status(200).json({ message: 'Aucune ressource trouvée' });
      }
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
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  // récupérer une ressource par son id
  getRessourceById: async (req, res) => {
    const { id } = req.params;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  // get ressources by user id
  getUserRessources: async (req, res) => {
    const { userId } = req.params;
    try {
      const ressource = await Ressource.findAll({ where: { userId } });
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  // update ressource by id
  updateRessource: async (req, res) => {
    const { id } = req.params;
    const { title, description, code } = req.body;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
      ressource.title = title;
      ressource.description = description;
      ressource.code = code;
      await ressource.save();
      res.json(ressource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  // delete ressource by id
  deleteRessource: async (req, res) => {
    const { id } = req.params;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
      await ressource.destroy();
      res.status(200).json({ message: 'Ressource supprimée' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

  // delete all ressources
  deleteAllRessources: async (req, res) => {
    try {
      await Ressource.destroy({ truncate: true });
      res.status(200).json({ message: 'Toutes les ressources ont été supprimées' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },

};

module.exports = ressourceController;
