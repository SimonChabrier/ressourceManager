const express = require('express');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db'); 
const { openRouter, apiRouter  } = require('./routes/_index');
const sessionConfig = require('./security/session'); 
const cors = require('cors'); 
const startWebSocketServer = require('./notifications/ws');
const path = require('path'); 
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;
const { logErr, captureRes } = require('./services/logger');

const app = express();

app.use(bodyParser.json()); // use for parsing application/json 
app.use(bodyParser.urlencoded({ extended: true })); // use for parsing application/x-www-form-urlencoded
app.use(cors(
  {
    origin: 'http://localhost:8080',
    credentials: true, // pour envoyer le cookie de session au frontend (ici le cookie passport qui contient le jwt)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));

sessionConfig(app); // use for session management on app all routes
app.use(express.static(path.join(__dirname, 'public'))); // use for static files

//* ROUTES + MIDDLEWARES LOGS + ROUTERS *//
if(process.env.CAPTURE_LOGS === 'true') {
  app.use('/api', captureRes, apiRouter); // use for api routes and log response (placer le router après les middlewares de log pour logger les réponses)
  app.use('/', captureRes, openRouter); // use for open routes and log response (placer le router après les middlewares de log pour logger les réponses)
} else {
  app.use('/api', apiRouter); 
  app.use('/', openRouter); 
}

app.use(logErr); // use for log errors - put it after routes to log server errors

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    startWebSocketServer();
    console.log(`SERVER START ON PORT: ${PORT}`);
  });
});



