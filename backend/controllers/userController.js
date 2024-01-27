const User  = require('../models/user'); 

const userController = {
  // get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll(); 
      if(users.length === 0) {
        return res.status(200).json({ message: 'Aucun utilisateur enregistré' });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // create new user
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
  // update one user
  patchUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password, firstName, lastName } = req.body;
    try {
      const user = await User.findByPk(id);

      // ne traiter que les champs renseignés
      username ? user.username = username : null;
      email ? user.email = email : null;
      password ? user.password = password : null; // password encodé automatiquement par le hook beforeCreate / beforeUpdate
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
        res.status(404).json({ message: `L'utilisateur avec l'id ${id} n'existe pas` });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // delete one user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        // reset user_id in ressources
        await user.destroy({ truncate : true }); // Apeller detroy de sequalize sur l'instance de l'utilisateur pour supprimer les ressources associées 
        res.json({ message: `L'utilisateur avec l'id ${id} a été supprimé` });
      } else {
        res.status(404).json({ message: `L'utilisateur avec l'id ${id} n'existe pas` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // get one user by username
  findByUserName: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({where : {username : username}});
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: `L'utilisateur avec le username ${username} n'existe pas` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // get one user by email
  findByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({where : {email : email}});
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: `L'utilisateur avec le email ${email} n'existe pas` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // get one user by id
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: `L'utilisateur avec l'id ${id} n'existe pas` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },
  // delete all users
  deleteAllUsers: async (req, res) => {
    try {
      await User.destroy({ where: {} });
      res.json({ message: 'Tous les utilisateurs ont été supprimés' });
    } catch (error) {
      console.error(error);
      res.status(500).json('Erreur interne du serveur');
    }
  },

};

module.exports = userController;
