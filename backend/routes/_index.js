// Routers index 
const express = require('express');
const openRouter = express.Router(); // je récupère le router d'express
const apiRouter = express.Router(); // je récupère le router d'express
// routes détails
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const logRoutes = require('./logRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const contactRoutes = require('./contactRoutes');

// custom security middleware
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

// open routes préfix: /
openRouter.use('/', authRoutes);
openRouter.use('/contact', contactRoutes);
openRouter.use('/ws', express.static('public/ws.html'));

// secure routes préfix: /api
if (process.env.NODE_ENV === 'prod') {
    apiRouter.use('/users',isAuthenticated, verifyToken, userRoutes);
    apiRouter.use('/ressources', verifyToken, ressourceRoutes);
    apiRouter.use('/logs',isAuthenticated, verifyToken, logRoutes);
} else {
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/ressources', ressourceRoutes);
    apiRouter.use('/logs', logRoutes);
}    

module.exports = { openRouter, apiRouter };
