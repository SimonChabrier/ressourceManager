const fs = require('fs');
const path = require('path');
const moment = require('moment'); // pour formater la date Middleware Express

// on vérifie que le dossier de destination existe, sinon on le crée
// avec l'option recursive: true, on crée le dossier et tous les dossiers parents qui n'existent pas
// ça crée aussi le fichier s'il n'existe pas
const ensureDirectoryExistence = (filePath) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// on crée un objet loggerFileWriter qui contient les méthodes pour logger les requêtes et les réponses
// et les écrire dans des fichiers json
const loggerFileWriter = {

    logClientRequestsToFile: (req, res, next) => {
        
        const logFile = path.join(__dirname, '../logs/client_requests_log.json');
        ensureDirectoryExistence(logFile);

        const method = req.method;
        const url = req.url;
        const code = res.statusCode;
        const date = moment().format('DD/MM/YY HH[h]mm[m]');
        
        const success = { method, url, code, date };
        
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
        existingLogs.push(success);
        // Écrire la liste mise à jour dans le fichier
        fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));
        next();
    },

    // Apallé sur le logger methode logReq quand il y a une code réponse >= 400
    logControllersResponsesToFile: (req, res, next) => {
        
        const logFile = path.join(__dirname, '../logs/server_responses_log.json');
        ensureDirectoryExistence(logFile);

        const code = res.statusCode;
        const message = res.statusMessage;
        const method = req.method;
        const route = req.baseUrl;
        const controllerReturnMessage = res.locals.message;  // res.locals.message est diffisée par le middleware captureResponse qui est appelé dans les routers
        let formatedControllerMessage = controllerReturnMessage.message;
        formatedControllerMessage.length === 1 ? formatedControllerMessage = formatedControllerMessage[0] : formatedControllerMessage = formatedControllerMessage;  
        const date = moment().format('DD/MM/YY HH[h]mm[m]');
        const error = { code, method, route, formatedControllerMessage,  message, date };
        // Lire le fichier existant s'il existe
        let existingLogs = [];
        try {
            const existingLogsContent = fs.readFileSync(logFile, 'utf8');
            existingLogs = JSON.parse(existingLogsContent);
        } catch (err) {
            console.error('Le fichier de log n\'existe pas ou est vide');
        }
        // Ajouter le nouveau log à la liste existante
        existingLogs.push(error);
        // Écrire la liste mise à jour dans le fichier
        fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));
        next();
    },

};

module.exports = loggerFileWriter;