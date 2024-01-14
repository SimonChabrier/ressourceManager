const express = require('express');
const router = express.Router();
const isAuthenticated = require('../security/isAuthenticated');

const userRoutes = require('./userRoutes');
const ressourceRoutes = require('./ressourceRoutes');
const authRoutes = require('./authRoutes');


// routes fermées (authentification requise)
// router.use('/users',isAuthenticated, userRoutes);
// router.use('/ressources',isAuthenticated, ressourceRoutes);

// routes ouvertes
router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/ressources', ressourceRoutes);

module.exports = router;
