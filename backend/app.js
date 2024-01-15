
const express = require('express');
const bodyParser = require('body-parser'); // pour parser les requêtes HTTP
const sequelize = require('./config/db'); // Assurez-vous d'avoir le chemin correct vers votre configuration Sequelize
const routes = require('./routes');
const sessionConfig = require('./security/session'); // pour la session
const cors = require('cors'); // pour autoriser les requêtes cross-domain

require('./models/relations')

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// autoriser les requêtes cross-domain
app.use(cors());

// session et passport pour l'authentification
sessionConfig(app); // Utilisation de la gestion de session avec Passport

// autres middleware

// Routes
app.use('/api', routes); // Préfixe toutes les routes avec /api

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur.');
});

// Synchronisation avec la base de données et lancement du serveur
// il créer ici les tables si elles n'existent pas déjà
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
});
