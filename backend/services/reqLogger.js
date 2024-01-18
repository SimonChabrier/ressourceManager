const reqLogger = {

    log: (req, res, next) => {
        console.log(`******************* Requette ---> ${req.method}, ${req.url}`);
        // récupèrer l'ip du client
        console.log(`******************* Client IP --> ${req.ip}`);
        // récupérer l'origine de la requête
        console.log(`******************* Origin -----> ${req.get('Origin')}`);
        next();
    }
}

module.exports = reqLogger;