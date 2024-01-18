const { json } = require('body-parser');
const mailer = require('../notifications/mailer');

const appMails = {

    // rejette les champs de formulaires vides.
    validateFields: (fields) => {
        const errors = [];
        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (!fieldValue) {
                errors.push(`Le champ ${fieldName} est obligatoire`);
            }
        }
        return errors;
    },

    // assemble et envoie le mail de contact
    sendContactMail: async (from, to, subject, content) => {
        const message = { from, to, subject, text: content};

        try {
            const info = await mailer.sendMail(message);
            const { accepted, rejected, response } = info;
        
            return {
                message: `Mail envoyé de ${info.envelope.from} à ${info.envelope.to}`,
                accepted: accepted,
                rejected: rejected,
                response: response
            };
            
        } catch (error) {
            console.error(error);
            return {
                error: 'Erreur lors de l\'envoi du mail',
                details: error.message
            };
        }
    },
    

    // New password mail send after mail update from User Model hook
    passwordRenewMail: async (user) => {
    const { email, password } = user;
      const mailOptions = {
        from: process.env.MAIL_ADRESS,
        to: email,
        subject: 'Réinitialisation du mot de passe',
        text: `Votre nouveau mot de passe est : ${password}`,
      };
  
      mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Erreur lors de l\'envoi du mail' });
        }
  
      return res.status(200).json({ message: 'Mot de passe modifié avec succès' });
      
      });
    }

};
module.exports = appMails;