const nodemailer = require('nodemailer');


//* TESTER EN PROD AVEC GMAIL CHANGER LE .ENV
if(process.env.NODE_ENV === 'prod') { // gmail
    
const mailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ADRESS, 
        pass: process.env.MAIL_PASSWORD, 
    }
    });

    module.exports = mailer;

} else { // mailhog

const mailer = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false, // true for 465, false for other ports
});

    module.exports = mailer;
};

