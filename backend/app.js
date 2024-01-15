
const express = require('express');
const bodyParser = require('body-parser'); // pour parser les requêtes HTTP
const sequelize = require('./config/db'); // Assurez-vous d'avoir le chemin correct vers votre configuration Sequelize
const routes = require('./routes');
const sessionConfig = require('./security/session'); // pour la session
const cors = require('cors'); // pour autoriser les requêtes cross-domain

// pour le websocket
const http = require('http');
const WebSocket = require('ws');


// Création du serveur Express
const app = express();
// Création du serveur HTTP à partir du serveur Express
const server = http.createServer(app);
// Création du serveur WebSocket sur le serveur Express
const wss = new WebSocket.Server({ server });
// Port du serveur Express ou 3000 par défaut si non défini dans les variables d'environnement
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;

// Endpoint pour gérer les connexions WebSocket
wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie.');
  // on écoutera les messages envoyés par le client ici sur le serveur
  ws.on('message', (message) => {
    console.log(`Reçu du client : ${message}`);
  });
  // Envoyer un message au client
  ws.send('Bienvenue sur le serveur WebSocket.');
});

// Endpoint pour gérer les connexions WebSocket
app.get('/socket', (req, res) => {
  res.json({ message: 'Bienvenue sur le serveur WebSocket.' });
});

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
