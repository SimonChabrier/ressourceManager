const express = require('express');
const bodyParser = require('body-parser'); // pour parser les requêtes HTTP
const sequelize = require('./config/db'); // Assurez-vous d'avoir le chemin correct vers votre configuration Sequelize
const routes = require('./routes/_index');
const sessionConfig = require('./security/session'); // pour la session
const cors = require('cors'); // pour autoriser les requêtes cross-domain
const startWebSocketServer = require('./notifications/ws');

// Lancement du serveur websocket 
startWebSocketServer();

// Création de l'application express et définition du port
const app = express();
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));

// session et passport pour l'authentification
sessionConfig(app); 

// moniteur de requêtes pour logger les requêtes reçues avant l'appel des routes
app.use((req, res, next) => {
  console.log(`********** REQUETTE RECUE ** METHODE ** ${req.method} ** ENDPOINT ${req.url} ** ORIGIN  ** ${req.get('Origin')}`);
  next();
});

// Ajout des routes retournée par le router général /routes/index.js - Je préfixe toutes les routes avec /api
app.use('/api', routes); 

//* Middleware pour servir les fichiers statiques du dossier public
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//* Route pour servir le fichier ws.html
app.get('/ws', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ws.html'), (err) => {
      if (err) {
          console.error(err);
          res.status(err.status).end();
      }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur retournée dans app.js');
});

// Synchronisation avec la base de données et lancement du serveur -il créer ici les tables si elles n'existent pas déjà
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
});



