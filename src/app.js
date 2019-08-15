const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mqttHandler = require('./mqtt_handler');
const bodyParser = require('body-parser');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
// MQTT Client Initialize the connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mqttClient = new mqttHandler();
mqttClient.connect();
// End here
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'oh my god'
  });
});

app.get('/try', (req, res) => {
  res.send('Welcome!');
});

app.post("/send-mqtt", function(req, res) {
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
});
// Routes end here

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
