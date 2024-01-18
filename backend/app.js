const express = require('express');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db'); 
const { openRouter, apiRouter  } = require('./routes/_index');
const sessionConfig = require('./security/session'); 
const cors = require('cors'); 
const startWebSocketServer = require('./notifications/ws');
const path = require('path'); 
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;
const reqLogger = require('./services/reqLogger');

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
app.use(reqLogger.log); // use for log request
sessionConfig(app); // use for session management on app all routes

// app.use((req, res, next) => {
//   console.log(`********** REQUETTE RECUE ** METHODE ** ${req.method} ** ENDPOINT ${req.url} ** ORIGIN  ** ${req.get('Origin')}`);
//   next();
// });
app.use('/api', apiRouter); // use for api routes
app.use('/', openRouter); // use for open routes
app.use(express.static(path.join(__dirname, 'public'))); // use for static files
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur retournée dans app.js');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    startWebSocketServer();
    console.log(`SERVER START ON PORT: ${PORT}`);
  });
});



