const express = require('express');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db'); 
const { openRouter, apiRouter  } = require('./routes/_index');
const sessionConfig = require('./security/session'); 
const cors = require('cors'); 
const startWebSocketServer = require('./notifications/ws');
const path = require('path'); 
const app = express();
const PORT = process.env.EXPRESS_SERVEUR_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));

sessionConfig(app); 

app.use((req, res, next) => {
  console.log(`********** REQUETTE RECUE ** METHODE ** ${req.method} ** ENDPOINT ${req.url} ** ORIGIN  ** ${req.get('Origin')}`);
  next();
});

app.use('/api', apiRouter); 
app.use('/', openRouter);

app.use(express.static(path.join(__dirname, 'public')));
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



