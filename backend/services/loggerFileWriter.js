const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');

const ensureDirectoryExistence = async (filePath) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        await fs.mkdir(directory, { recursive: true });
    }
};

const loggerFileWriter = {

    logClientRequestsToFile: async (req, res, next) => {
        const logFile = path.join(__dirname, '../logs/client_requests_log.json');
        await ensureDirectoryExistence(logFile);

        const method = req.method;
        const url = req.url;
        const code = res.statusCode;
        const date = moment().format('DD/MM/YY HH[h]mm[m]');
        
        const success = { method, url, code, date };
        
        let existingLogs = [];
        try {
            const existingLogsContent = await fs.readFile(logFile, 'utf8');
            existingLogs = JSON.parse(existingLogsContent);
        } catch (err) {
            console.error('Le fichier de log n\'existe pas ou est vide');
        }
        
        existingLogs.push(success);

        try {
            await fs.writeFile(logFile, JSON.stringify(existingLogs, null, 2));
        } catch (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de logs:', err);
        }

        next();
    },

    logControllersResponsesToFile: async (req, res, next) => {
        const logFile = path.join(__dirname, '../logs/server_responses_log.json');
        await ensureDirectoryExistence(logFile);

        const code = res.statusCode;
        const message = res.statusMessage;
        const method = req.method;
        const route = req.baseUrl;
        const controllerReturnMessage = res.locals.message;
        let formatedControllerMessage = controllerReturnMessage.message;
        formatedControllerMessage.length === 1 ? formatedControllerMessage = formatedControllerMessage[0] : formatedControllerMessage = formatedControllerMessage;  
        const date = moment().format('DD/MM/YY HH[h]mm[m]');
        const error = { code, method, route, formatedControllerMessage,  message, date };

        let existingLogs = [];
        try {
            const existingLogsContent = await fs.readFile(logFile, 'utf8');
            existingLogs = JSON.parse(existingLogsContent);
        } catch (err) {
            console.error('Le fichier de log n\'existe pas ou est vide');
        }
        
        existingLogs.push(error);

        try {
            await fs.writeFile(logFile, JSON.stringify(existingLogs, null, 2));
        } catch (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de logs:', err);
        }

        next();
    },
};

module.exports = loggerFileWriter;
