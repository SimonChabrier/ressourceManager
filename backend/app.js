const express = require('express');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db'); 
const { openRouter, apiRouter  } = require('./routes/_index');
const sessionConfig = require('./security/session'); 
const cors = require('cors'); 
const startWebSocketServer = require('./notifications/ws');
const path = require('path'); 
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;
const logger = require('./services/logger');
const loggerFileWriter = require('./services/loggerFileWriter');

const app = express();

app.use(bodyParser.json()); // use for parsing application/json 
app.use(bodyParser.urlencoded({ extended: true })); // use for parsing application/x-www-form-urlencoded
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));


app.use(logger.logReq); // use for log request - put it before routes 
sessionConfig(app); // use for session management on app all routes
app.use(express.static(path.join(__dirname, 'public'))); // use for static files
app.use(loggerFileWriter.logClientRequestsToFile); // use for log success - put it before routes

app.use('/api', apiRouter); // use for api routes
app.use('/', openRouter); // use for open routes

app.use(logger.logErr); // use for log errors - put it after routes



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {

    startWebSocketServer();
    console.log(`SERVER START ON PORT: ${PORT}`);
  });
});



