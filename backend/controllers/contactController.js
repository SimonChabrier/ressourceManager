const validator = require('../services/validator');
const appMail = require('../services/mails')

const contactController = {

    // Gérer l'envoi d'un mail
    sendContactMail: async (req, res) => { 

        // récupérer les infos du formulaire ou insomia
        const { from, to, subject, content } = req.body;
        // valider les champs
        const errors = validator.validateFields({ from, to, subject, content });
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        // envoyer le mail depuis le service  mail.js
        const sendInfo = await appMail.sendContactMail(from, to, subject, content);
        console.log(sendInfo);
        // envoyer la réponse
        res.status(200).json({ message: 'Mail envoyé' });
    
    },

};
  

module.exports = contactController;