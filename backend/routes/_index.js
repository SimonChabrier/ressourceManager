// router général qu'on apelle dans app.js pour toutes les routes
// définies dans les autres fichiers de routes (userRoutes, ressourceRoutes, etc.) 

const express = require('express');
const router = express.Router(); // je récupère le router d'express

// routes 
const userRoutes = require('./userRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const authRoutes = require('./authRoutes');
const contactRoutes = require('./contactRoutes');

// sécurité middleware
const isAuthenticated = require('../security/isAuthenticated');
const verifyToken = require('../security/jwtCheck');

// routes fermées (authentification requise)
// router.use('/users',isAuthenticated, userRoutes);
// router.use('/ressources',isAuthenticated, ressourceRoutes); 

// routes fermées (JWT requis)
// router.use('/users', verifyToken, userRoutes);

// routes ouvertes préfixées par /api
router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/ressources', ressourceRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
