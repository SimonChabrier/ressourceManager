const fs = require('fs');
const path = require('path');
const appUtils = require('../utils/appUtils');
const logController = require('./../controllers/logController');

const logger = {
    // middleware pour capturer le message dans res.locals.message
    captureRes : (req, res, next) => {

        const originalJson = res.json;
    
        res.json = function (data) {
            //console.log('data', data)
            // si j'ai pas la clé message dans l'objet data, je la rajoute une valeur par défaut pour éviter d'avoir un undefined dans les logs
            if (!data.message) {
                data.message = 'pas de clé message dans l\'objet data retourné par le controller';
            }
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
        console.log(`******************* Message -----> ${res.locals.message}`); // res.locals.message est diffisée par le middleware captureResponse qui est appelé dans les routers
                                                                                // c'est le return explicite qui est retourné par les controllers (si pas de return explicite, c'est un return implicite de undefined)

        //* CE QU'ON RECUPERE DANS LA REQUETE
        const method = req.method;
        const url = req.url;
        const ip = req.ip;
        const origin = req.get('Origin') || 'no origin';

        next();

        res.on('finish', () => { // finish est un événement de l'objet response qui se déclenche quand la réponse est envoyée au client
                                // je peux récupérer le code de statut de la réponse et le message de la réponse retourné par le controller

            const end = Date.now();
            const duration = end - start;
            
            console.log(`******************* Reponse ---> ${res.statusCode}`);
            console.log(`******************* Duree -----> ${duration}ms`);
            if (req.body) { console.log(`******************* Body ------> ${JSON.stringify(req.body)}`); }
            if (res.statusCode >= 400) { console.error(`******************* Erreur -----> ${res.statusMessage}`); }
            if (res.locals.message) { console.log(`******************* Message -----> ${JSON.stringify(res.locals.message)}`); } // les messages retournés par les controllers sont diffusés par le middleware captureResponse
 
            //* CE QU'ON RECUPERE DANS LA REPONSE
            const code = res.statusCode;
            const date = appUtils.appDateFormat();
            const time = duration + ' ms';
            let message = res.locals.message.message;  // res.locals.message est diffisée par le middleware captureResponse qui est appelé dans les routers
            message.length === 1 ? message = message[0] : message;

            const data = [ method, url, ip, origin, code, date, time, message ]

            //* ON ECRIT LES LOGS DANS UN FICHIER JSON ET ON CREE UN NOUVEAU LOG DANS LA BDD
            // Vérifier si une réponse a déjà été envoyée (pour ne pas envoyer de headers après l'envoi de la réponse)
            if (!res.locals.responseSent) {
                // Si aucune réponse n'a été envoyée, écrire les logs
                logger.writeLogs(...data);
                // on apelle la méthode du controller logController pour créer un nouveau log
                logController.createLog(...data);
            }
        });

    },
    // middleware pour logger les erreurs
    logErr: (err, req, res, next) => {
        console.log('logErr');
        console.error(err.stack);
        res.status(500).json({ message: 'Erreur serveur' });
    },
    // fonction pour écrire les logs dans un fichier
    writeLogs : ( method, url, ip, origin, code, date, ReqResDuration, message ) => {
        const logFile = path.join(__dirname, '../logs/requests.json');
        appUtils.ensureDirectoryExistence(logFile);
    
        const data = { method, url, ip, origin, code, date, ReqResDuration, message };
        // Lire le fichier existant s'il existe
        let existingLogs = [];
        try {
            const existingLogsContent =  fs.readFileSync(logFile, 'utf8');
            existingLogs = JSON.parse(existingLogsContent);
        } catch (err) {
            // Le fichier n'existe peut-être pas encore ou est vide
            console.error('Le fichier de log n\'existe pas ou est vide -> il va être créé ou édité');
        }
        // Ajouter le nouveau log à la liste existante
        existingLogs.push(data);
        // Écrire la liste mise à jour dans le fichier
        fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));
    },
};

module.exports = {  
    // format pour exporter plusieurs fonctions et allèger les appel dans les fichiers en faisant  const { logReq, logErr, captureResponse } = require('./services/logger');
    // et en appelant les fonctions directement par leur nom
    logReq: logger.logReq,
    logErr: logger.logErr,
    captureRes: logger.captureRes
};
