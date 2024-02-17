const Ressource = require('../models/ressource');
const User = require('../models/user');

const ressourceController = {
  // get all ressources with user
  getAllRessources: async (req, res) => {

    // get offset and limit from query
    let offsetValue = parseInt(req.query.offset);
    let limitValue = parseInt(req.query.limit);
    console.log('offsetValue', offsetValue);
    console.log('limitValue', limitValue);
    try {
      const ressourcesCount = await Ressource.count();
      const ressources = await Ressource.findAll({ include: User, offset : offsetValue, limit : limitValue});
      if(ressources.length === 0) {
        return res.status(200).json({ message: 'Aucune ressource trouvée' });
      } else if(ressources.length === 1) { // si j'ai une seule ressource 
        return res.json({"message": "Ressource trouvée", "ressource": ressources, "ressourcesCount": ressourcesCount});
      } else { // si j'ai plusieurs ressources
        return res.json({"message": "Ressources trouvées", "ressources": ressources, "ressourcesCount": ressourcesCount});
      }
    } catch (error) {
       return res.status(500).send({ message: error.message });
    }
  },
  // get one ressource by id and user associated
  getRessourceById: async (req, res) => {
    const { id } = req.params;
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
      return res.json({"message": "Ressource trouvée", "ressource": ressource});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },
  // get ressources by user id
  getUserRessources: async (req, res) => {
    const { userId } = req.params;
    try {

      // la ressource seule
      //const ressource = await Ressource.findAll({ where: { userId } });

      // la ressource avec l'utilisateur associé
      //const ressource = await Ressource.findAll({ where: { userId }, include: User });

      // la ressource avec l'utilisateur associé sans les champs password, createdAt, updatedAt
      const ressource = await Ressource.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      });

      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }
        return res.json({"message": "Ressources trouvées", "ressources": ressource});
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },
  // create new ressource with user
  createRessource: async (req, res) => {
    const { title, content, tag, tech, userId } = req.body;
    try {
      const newRessource = await Ressource.create({title, content, tag, tech, userId});
        return res.status(201).json({ message: 'Ressource créée', newRessource });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur' + error.message });
    }
  },
  // update ressource by id
  updateRessource: async (req, res) => {
    
    const { id } = req.params;
    const { title, content, tag, tech, userId } = req.body;
   console.log(req.body);
    try {
      const ressource = await Ressource.findByPk(id);
      if (!ressource) {
        return res.status(404).json({ message: 'Ressource non trouvée' });
      }

      ressource.title = title;
      ressource.content = content;
      ressource.tag = tag;
      ressource.tech = tech;
      ressource.userId = userId;

      await ressource.save();
      
      return res.status(200).json({ message: 'Ressource modifiée', ressource });
   
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur' + error.message});
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
        return res.status(200).json({ message: 'Ressource supprimée' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },
  // delete all ressources
  deleteAllRessources: async (req, res) => {
    try {
      await Ressource.destroy({ truncate: true });
        return res.status(200).json({ message: 'Toutes les ressources ont été supprimées' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  },
};

module.exports = ressourceController;
