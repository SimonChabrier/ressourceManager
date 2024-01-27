const Log = require('../models/logs');

const logController = {

    getAllLogs: async (req, res) => {
        try {
            const logs = await Log.findAll();
            if (logs.length === 0) {
                res.status(200).json({ message: 'Aucun log enregistré' });
            }
            res.json(logs);
        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur interne du serveur');
        }
    },

    getLog: async (req, res) => {
        const { id } = req.params;
        try {
            const log = await Log.findByPk(id);
            if (log) {
                res.json(log);
            } else {
                res.status(404).json({ message: `Le log avec l'id ${id} n'existe pas` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur interne du serveur');
        }
    },

    // apellé dans le middleware logReq de logger.js pour créer un nouveau log
    createLog: async ( method, url, ip, origin, code, date, time, message)  => {
        try {
            const newLog = await Log.create({ 
                method, 
                url, 
                ip, 
                origin, 
                code, 
                date, 
                time, 
                message 
            });
            console.log(`Le log avec l'id ${newLog.id} a été créé`);
        } catch (error) {
            console.error(error);
        }
    },

    deleteLog: async (req, res) => {
        const { id } = req.params;
        try {
            const log = await Log.findByPk(id);
            if (log) {
                await log.destroy();
                return res.json({ message: `Le log avec l'id ${id} a été supprimé` });
            } else {
                return res.status(404).json({ message: `Le log avec l'id ${id} n'existe pas` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur interne du serveur');
        }
    },

    deleteAllLogs: async (req, res) => {
        try {
            const logs = await Log.findAll();
            if (logs.length === 0) {
                res.status(200).json({ message: 'Aucun log enregistré' });
            }
            res.json(logs);
        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur interne du serveur');
        }
    }
};

module.exports = logController;