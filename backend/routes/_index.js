// Routers index 
const express = require('express');
const openRouter = express.Router(); // je récupère le router d'express
const apiRouter = express.Router(); // je récupère le router d'express
// routes détails
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const contactRoutes = require('./contactRoutes');

// custom security middleware
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

// capturer le message dans res.locals.message
const captureResponse = require('../services/captureResponse'); // middleware pour capturer le message dans res.locals.message

openRouter.use(captureResponse); // récupère le message dans res.locals.message pour le logger
apiRouter.use(captureResponse); // le message c'est toujours le résultat de la méthode du controller appelée

// open routes préfix: /
openRouter.use('/', authRoutes);
openRouter.use('/contact', contactRoutes);
openRouter.use('/ws', express.static('public/ws.html'));


// secure routes préfix: /api
if (process.env.NODE_ENV === 'prod') {
    apiRouter.use('/users',isAuthenticated, verifyToken, userRoutes);
    apiRouter.use('/ressources',isAuthenticated, verifyToken, ressourceRoutes);
} else {
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/ressources', ressourceRoutes);
}    

module.exports = { openRouter, apiRouter };
