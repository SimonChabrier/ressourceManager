const express = require('express');
const bodyParser = require('body-parser'); // pour parser les requêtes HTTP
const sequelize = require('./config/db'); // Assurez-vous d'avoir le chemin correct vers votre configuration Sequelize
const { openRouter, apiRouter  } = require('./routes/_index'); // Je récupère les routes
const sessionConfig = require('./security/session'); // pour la session
const cors = require('cors'); // pour autoriser les requêtes cross-domain
const startWebSocketServer = require('./notifications/ws');
const path = require('path'); // pour servir les fichiers statiques du dossier public

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
app.use('/api', apiRouter); 
app.use('/', openRouter);

// Servir les fichiers statiques du dossier public (templates, images, etc)
app.use(express.static(path.join(__dirname, 'public')));
// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur retournée dans app.js');
});
// Synchronisation avec la base de données et lancement du serveur 
// force: true pour recréer les tables à chaque lancement du serveur
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
});



