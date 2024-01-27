const fs = require('fs');
const path = require('path');

// on vérifie que le dossier de destination existe, sinon on le crée
const ensureDirectoryExistence = (filePath) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// l'objet qui va servir à écrire dans le fichier de log

const loggerFileWriter = {

    logSucessToFile: (req, res, next) => {
        console.log('logSucessToFile');
        const logFile = path.join(__dirname, '../logs/client_requests_log.json');
        ensureDirectoryExistence(logFile);

        const method = req.method;
        const url = req.url;
        const code = res.statusCode;
        const message = res.locals.message;
        const date = new Date();

        const success = { method, url, code, message, date };
        const successJSON = JSON.stringify(success);
        fs.appendFile(logFile, `${successJSON},\n`, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture dans le fichier de succès:', err);
            }
        });
        next();

    },

    logErrorsToFile: (req, res, next) => {
        console.log('logErrorsToFile');
        const logFile = path.join(__dirname, '../logs/server_responses_log.json');
        ensureDirectoryExistence(logFile);

        const code = res.statusCode;
        const message = res.statusMessage;
        const method = req.method;
        const route = req.baseUrl;
        const controllerReturnMessage = res.locals.message;  // res.locals.message doit être défini dans les controllers
        const date = new Date();        
        const error = { code, method, route, controllerReturnMessage,  message, date };
        const errorJSON = JSON.stringify(error);
        fs.appendFile(logFile, `${errorJSON},\n`, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture dans le fichier d\'erreur:', err);
            }
        });
        next();
    },

};

// on exporte l'objet loggerWriter
module.exports = loggerFileWriter;