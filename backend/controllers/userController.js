const User  = require('../models/user'); 

const userController = {
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll(); 
      if(users.length === 0) {
        return res.status(200).json({ message: 'Aucun utilisateur enregistré' });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  createUser: async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    try {
      const newUser = await User.create({ 
        username, 
        email, 
        password, 
        firstName, 
        lastName 
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.errors.map(err => err.message) });    }
  },

  patchUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password, firstName, lastName } = req.body;
    try {
      const user = await User.findByPk(id);

      // ne traiter que les champs renseignés
      username ? user.username = username : null;
      email ? user.email = email : null;
      password ? user.password = await passwordEncoder.hashPassword(password): null;
      firstName ? user.firstName = firstName : null;
      lastName ? user.lastName = lastName : null;

      if (user) {
        await user.update({ 
          username : username, 
          email: email, 
          password: user.password, 
          firstname: firstName, 
          lastname: lastName 
        });
        res.json(user);
      } else {
        res.status(404).send(`L'utilisateur avec l'id ${id} n'existe pas`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy(); // Apeller detroy de sequalize sur l'instance de l'utilisateur pour supprimer les ressources associées 
        res.json('Utilisateur supprimé');
      } else {
        res.status(404).send(`L'utilisateur avec l'id ${id} n'existe pas`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
},

//* autres méthodes

  findByUserName: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({where : {username : username}});
      if (user) {
        res.json(user);
      } else {
        res.status(404).send(`L'utilisateur avec le username ${username} n'existe pas`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },
  
  findByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({where : {email : email}});
      if (user) {
        res.json(user);
      } else {
        res.status(404).send(`L'utilisateur avec le email ${email} n'existe pas`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send(`L'utilisateur avec l'id ${id} n'existe pas`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur interne du serveur');
    }
  },

};

module.exports = userController;
