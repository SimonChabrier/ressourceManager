const validator = require('../services/validator');
const appMail = require('../services/mails')

const contactController = {

    // Gérer l'envoi d'un mail
    sendContactMail: async (req, res) => { 

        // récupérer les infos du formulaire ou insomia
        const { from, to, subject, content } = req.body;
        // valider les champs
        const errors = validator.validateFields({ from, to, subject, content });
        // si j'ai des erreurs
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }
        // envoyer le mail depuis le service  mail.js
        const sendInfo = await appMail.sendContactMail(from, to, subject, content);
        // si j'ai des erreurs dans sendInfo (erreur de transport)
        if (sendInfo.error) {
            return res.status(500).json({ message: sendInfo.error });
        }
        // envoyer la réponse
        return res.status(200).json({ message: 'Mail envoyé' });
    
    },

};
  

module.exports = contactController;