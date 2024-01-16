const mailer = require('../notifications/mailer');
const util = require('util');

const contactController = {

    // Valider les champs du formulaire
    validateFields: (fields) => {
        const errors = [];
    
        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (!fieldValue) {
                errors.push(`Le champ ${fieldName} est obligatoire`);
            }
        }
        return errors;
    },

    // Gérer l'envoi d'un mail
    sendContactMail: async (req, res) => { 

        // récupérer les infos du formulaire ou insomia
        const { from, to, subject, content } = req.body;

        // valider les champs
        const errors = contactController.validateFields({ from, to, subject, content });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }


        // créer un objet message avec les infos récupérées
        const message = { // si les clés et les valeurs ont le même nom, on peut écrire que la clé
            from,
            to,
            subject,
            text: content, // sinon on doit faire correspondre la valeur (name du form) à la clé attendue
        };
    
        // Utiliser util.promisify pour promettre la fonction sendMail et utiliser la syntaxe async/await
        const sendMailPromise = util.promisify(mailer.sendMail.bind(mailer));
    
        try {
            const info = await sendMailPromise(message);
    
            console.log(info);
            const { accepted, rejected, response } = info;
    
            res.status(200).json({
                message: `Mail envoyé de ${info.envelope.from} à ${info.envelope.to}`,
                accepted: accepted,
                rejected: rejected,
                response: response
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    },

};
  

module.exports = contactController;