const mailer = require('../notifications/mailer');

const appMails = {

    sendContactMail: async (req, res) => {

        const { from, to, subject, content } = req.body;

        const message = {
            from,
            to,
            subject,
            text: content,
        };

        try {
            const info = await mailer.sendMail(message);

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