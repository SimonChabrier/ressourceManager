const logger = {

    logReq: (req, res, next) => {
        // logger la requête
        const start = Date.now();
        console.log(`******************* Requette ---> ${req.method}, ${req.url}`);
        console.log(`******************* Client IP --> ${req.ip}`);
        console.log(`******************* Origin -----> ${req.get('Origin')}`);
        next();
        // logger la réponse
        res.on('finish', () => {
            const end = Date.now();
            const duration = end - start;
            console.log(`******************* Reponse ---> ${res.statusCode}`);
            console.log(`******************* Duree -----> ${duration}ms`);
            if (req.body) {
                console.log(`******************* Body ------> ${JSON.stringify(req.body)}`);
                // on logge le success dans un fichier
                logger.logSucessToFile(req, res, next);
            }
            if (res.statusCode >= 400) {
                console.error(`******************* Erreur -----> ${res.statusMessage}`);
                // on utilise logErrorsToFile pour logger les erreurs dans un fichier
                logger.logErrorsToFile(req, res, next);
            }
            if (res.locals.message) {
                console.log(`******************* Message -----> ${res.locals.message}`);
              }
          });
    }, 

    logErr: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Erreur interne du serveur retournée dans app.js');
    },

    logSucessToFile: (req, res, next) => {

        const fs = require('fs');
        const path = require('path');
        const logFile = path.join(__dirname, '../logs/success_log.json');

        const method = req.method;
        const url = req.url;
        const code = res.statusCode;
        const body = req.body;
        const ip = req.ip;
        const origin = req.get('Origin');
        const date = new Date();
        // créer un objet qui contient toutes les infos de la requête
        const success = { method, url, code, body, ip, origin, date };
        // convertir l'objet en JSON
        const successJSON = JSON.stringify(success);
        // écrire le JSON dans le fichier de log
        fs.appendFile(logFile, `${successJSON}\n`, (err) => {
            if (err) { 
                console.error('Erreur lors de l\'écriture dans le fichier de succès:', err);
            }
        });
        next();
    },
    
    logErrorsToFile: (req, res, next) => {
        
        const fs = require('fs');
        const path = require('path');
        const logFile = path.join(__dirname, '../logs/errors_log.json');


        const message = res.locals.message;
        const code = res.statusCode;
        const body = req.body;
        const url = req.url;
        const method = req.method;
        const ip = req.ip;
        const origin = req.get('Origin');
        const date = new Date();
        // on crée un objet qui contient toutes les infos de la requête
        const error = { message, code, body, url, method, ip, origin, date };
        // on convertit l'objet en JSON
        const errorJSON = JSON.stringify(error);
        // on écrit le JSON dans le fichier de log
        fs.appendFile(logFile, `${errorJSON}\n`, (err) => {
            if (err) { 
                console.error('Erreur lors de l\'écriture dans le fichier d\'erreur:', err);
            }
        });
        next(err);
    },


}

module.exports = logger;