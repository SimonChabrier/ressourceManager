const path = require('path');
const fs = require('fs');
const moment = require('moment'); // librairie pour gérer les dates

const appUtils = {

    // fonction pour créer le dossier recherché si il n'existe pas
    ensureDirectoryExistence : (filePath) => {
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    },

    // fonction pour formater la date avec moment.js (librairie pour gérer les dates)
    appDateFormat : (date) => {
        return moment().format('DD/MM/YY HH[h]m[mn]ss[s]');
    }

}

module.exports = appUtils;
