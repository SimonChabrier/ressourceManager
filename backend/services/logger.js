const fs = require('fs');
const path = require('path');
const appUtils = require('../utils/appUtils');
const Log = require('../models/logs');  

const logger = {
    // middleware pour capturer le message dans res.locals.message
    captureRes : (req, res, next) => {
        // Stocke la méthode json originale de l'objet response dans une variable (c'est une fonction que je récupère là)
        const originalControllerResponse = res.json;
        // Redéfinit la méthode json de l'objet response avec une fonction personnalisée avec un callback pour récupérer les données ou les modifier avant de les renvoyer
        res.json = (data) => {
            // console.log('captureRes', data); // ici data contient maintenant le return explicite de res.json du controller
            // Je regarde si  j'ai une propriété message dans l'objet data retourné par le controller
            if (!data.message) {
                // Si non je crée la propriété message et je lui donne la valeur 'pas de clé message dans l\'objet data retourné par le controller' pour ne pas avoir d'erreur dans la suite du code
                data.message = 'pas de clé message dans l\'objet data retourné par le controller';
            }
            // Si j'ai une propriété message dans l'objet data retourné par le controller, je stocke la réponse dans res.locals.message pour pouvoir la récupérer dans le middleware logReq
            res.locals.message = data;
            // Pour finir, j'appelle la méthode json originale de l'objet response avec les données modifiées ou non  (les données modifiées ici sont cellede la propriété message uniquement)
            // car j'en ai impérativement besoin dans logReq pour écrire les logs dans le fichier et dans la bdd
            // call est une méthode de l'objet Function qui permet d'appeler une fonction avec un contexte et des arguments spécifiques (ici le contexte est res et l'argument est data)
            originalControllerResponse.call(res, data);
        };
        // J'appelle le middleware suivant qui va logger la requête et la réponse
        logger.logReq(req, res, next);
    },
    
    // middleware pour logger les requêtes (Apellé dans app.js sur toutes les routes)
    logReq: (req, res, next) => {

        const start = Date.now();
        // récupèrer /api/ressource en entier (req.originalUrl) ou seulement /ressource (req.url)
        console.log(`******************* Requette ---> ${req.method}, ${req.originalUrl}`);
        console.log(`******************* Client IP --> ${req.ip}`);
        console.log(`******************* Origin -----> ${req.get('Origin')}`);
        console.log(`******************* Message -----> ${res.locals.message}`); // res.locals.message est diffisée par le middleware captureRes qui est appelé dans les routers pour récupérer le message retourné par les controllers
        console.log(`******************* Utilisateur connecté -----> ${req.user ? req.user.email : 'aucun'}`);         // récupèrer l'utilisateur connecté sur la session  (req.user est ajouté par passport)                                                                      
        //* CE QU'ON RECUPERE DANS LA REQUETE
        const method = req.method;
        const url = req.originalUrl;
        const ip = req.ip;
        const origin = req.get('Origin') || 'no origin';
        const connectedUser = req.user ? req.user.email : 'aucun';

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

            const data = [ connectedUser, method, url, ip, origin, code, date, time, message ]

            //* ON ECRIT LES LOGS DANS UN FICHIER JSON ET ON CREE UN NOUVEAU LOG DANS LA BDD
            // Vérifier si une réponse a déjà été envoyée (pour ne pas envoyer de headers après l'envoi de la réponse)
            if (!res.locals.responseSent) {
                // Si aucune réponse n'a été envoyée, écrire les logs
                logger.writeLogs(...data);
                // on apelle la méthode create du Model qui est async et qui retourne une promise c'est pour ça qu'on peut mettre un then et un catch
                Log.create({ connectedUser, method, url, ip, origin, code, date, time, message }).then((log) => {
                    console.log('Nouveau log créé'); // je retourne rien si tout est ok
                }).catch((err) => {
                    // sinon je retourne une erreur 500 et un message
                    console.error(err);
                });
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
    writeLogs : (connectedUser, method, url, ip, origin, code, date, ReqResDuration, message ) => {
        const logFile = path.join(__dirname, '../logs/requests.json');
        appUtils.ensureDirectoryExistence(logFile);
    
        const data = { connectedUser, method, url, ip, origin, code, date, ReqResDuration, message };
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
