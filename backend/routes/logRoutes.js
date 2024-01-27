const express = require('express');
const router = express.Router();
const LogController = require('../controllers/logController');


// toutes les routes sont préfixées par /api (cf app.js)
// préfixer les routes par /api/logs

router.get('/', LogController.getAllLogs);
router.get('/:id', LogController.getLog);
router.delete('/:id', LogController.deleteLog);
router.delete('/', LogController.deleteAllLogs);


module.exports = router;