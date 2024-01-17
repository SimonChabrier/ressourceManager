// router général qu'on apelle dans app.js pour toutes les routes
// définies dans les autres fichiers de routes (userRoutes, ressourceRoutes, etc.) 
const express = require('express');
const openRouter = express.Router(); // je récupère le router d'express
const apiRouter = express.Router(); // je récupère le router d'express
// routes détails
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const contactRoutes = require('./contactRoutes');
// sécurité middleware
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

// routes ouvertes préfix : /
openRouter.use('/', authRoutes);
openRouter.use('/contact', contactRoutes);
openRouter.use('/ws', express.static('public/ws.html'));

//* routes sécurisées préfix: /api
apiRouter.use('/users',isAuthenticated, verifyToken, userRoutes);
apiRouter.use('/ressources',isAuthenticated, verifyToken, ressourceRoutes); 

module.exports = { openRouter, apiRouter };
