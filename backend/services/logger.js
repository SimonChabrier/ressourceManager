const loggerFileWriter = require('./loggerFileWriter');

const logger = {

    logReq: (req, res, next) => {
        const start = Date.now();
        console.log(`******************* Requette ---> ${req.method}, ${req.url}`);
        console.log(`******************* Client IP --> ${req.ip}`);
        console.log(`******************* Origin -----> ${req.get('Origin')}`);
        // réponse de la méthode appellée dans le controller
        console.log(`******************* Message -----> ${res.locals.message}`);

        
        next();
        res.on('finish', () => {
            const end = Date.now();
            const duration = end - start;
            console.log(`******************* Reponse ---> ${res.statusCode}`);
            console.log(`******************* Duree -----> ${duration}ms`);
            if (req.body) {
                console.log(`******************* Body ------> ${JSON.stringify(req.body)}`);
            }
            if (res.statusCode >= 400) {
                console.error(`******************* Erreur -----> ${res.statusMessage}`);
                
                // on apelle la méthode logControllersResponsesToFile du module loggerFileWriter
                loggerFileWriter.logControllersResponsesToFile(req, res, next)
            }
            if (res.locals.message) { // les messages retournés par les controllers sont diffusés par le middleware captureResponse
                console.log(`******************* Message -----> ${JSON.stringify(res.locals.message)}`);
            }
        });
    },

    logErr: (err, req, res, next) => {
        console.log('logErr');
        console.error(err.stack);
        res.status(500).json({ message: 'Erreur serveur' });
    },

};

module.exports = logger;
