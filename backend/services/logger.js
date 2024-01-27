const moment = require('moment'); // pour formater la date Middleware Express
const fs = require('fs');
const path = require('path');

const logger = {

    // middleware pour capturer le message dans res.locals.message
    captureResponse : (req, res, next) => {

        const originalJson = res.json;
    
        res.json = function (data) {
          res.locals.message = data;
          originalJson.call(res, data);
        };
    
        next();
    },
    // middleware pour logger les requêtes
    logReq: (req, res, next) => {

        const start = Date.now();
        // requête de l'utilisateur
        console.log(`******************* Requette ---> ${req.method}, ${req.url}`);
        console.log(`******************* Client IP --> ${req.ip}`);
        console.log(`******************* Origin -----> ${req.get('Origin')}`);
        // réponse de la méthode appellée dans le controller
        console.log(`******************* Message -----> ${res.locals.message}`);
        next();

        res.on('finish', () => { // finish est un événement de l'objet response qui se déclenche quand la réponse est envoyée au client
                                // je peux récupérer le code de statut de la réponse et le message de la réponse retourné par le controller

            const end = Date.now();
            const duration = end - start;
            
            console.log(`******************* Reponse ---> ${res.statusCode}`);
            console.log(`******************* Duree -----> ${duration}ms`);
            
            if (req.body) {
                console.log(`******************* Body ------> ${JSON.stringify(req.body)}`);
            }
            if (res.statusCode >= 400) {
                console.error(`******************* Erreur -----> ${res.statusMessage}`);
            }
            if (res.locals.message) { // les messages retournés par les controllers sont diffusés par le middleware captureResponse
                console.log(`******************* Message -----> ${JSON.stringify(res.locals.message)}`);
            }


            // ÉCRIRE LES LOGS DANS UN FICHIER
            const method = req.method;
            const url = req.url;
            const ip = req.ip;
            const origin = req.get('Origin');
            const code = res.statusCode;
            const date = moment().format('DD/MM/YY HH[h]mm[mn]ss[s]');
            const time = duration + ' ms';
            const message = res.locals.message;  // res.locals.message est diffisée par le middleware captureResponse qui est appelé dans les routers
            let formatedControllerMessage = message.message;
            formatedControllerMessage.length === 1 ? formatedControllerMessage = formatedControllerMessage[0] : formatedControllerMessage = formatedControllerMessage;

            const data = [ method, url, ip, origin, code, date, time, formatedControllerMessage ]

            logger.writeLogs(...data);

        });

    },
    // middleware pour logger les erreurs
    logErr: (err, req, res, next) => {
        console.log('logErr');
        console.error(err.stack);
        res.status(500).json({ message: 'Erreur serveur' });
    },
    // fonction pour écrire les logs dans un fichier
    writeLogs : (method, url, ip, origin, code, date, time, message) => {
        const logFile = path.join(__dirname, '../logs/requests.json');
        logger.ensureDirectoryExistence(logFile);
    
        const data = { method, url, ip, origin, code, date, time, message };
        // Lire le fichier existant s'il existe
        let existingLogs = [];
        try {
            const existingLogsContent =  fs.readFileSync(logFile, 'utf8');
            existingLogs = JSON.parse(existingLogsContent);
        } catch (err) {
            // Le fichier n'existe peut-être pas encore ou est vide
            console.error('Le fichier de log n\'existe pas ou est vide');
        }
        // Ajouter le nouveau log à la liste existante
        existingLogs.push(data);
        // Écrire la liste mise à jour dans le fichier
        fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));
    },
    // fonction pour créer un dossier s'il n'existe pas
    ensureDirectoryExistence : (filePath) => {
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    },

};

module.exports = logger;
