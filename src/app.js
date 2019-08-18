const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mqttHandler = require('./api/controller/mqtt_handler');
const bodyParser = require('body-parser');
const config = require('./api/config/config.js');
const router = require('./api/router/router.js');
const Role = require('./api/model/role.js');

//require('dotenv').config();

// App configuration
const middlewares = require('./api/middlewares');
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// End here

// MQTT Client Initialize the connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const mqttClient = new mqttHandler();
mqttClient.connect();
// End here

// Configuring the database
const mongoose = require('mongoose');
 
mongoose.Promise = global.Promise;
 
// Connecting to the database
mongoose.connect(config.DBurl)
    .then(() => {
      console.log("Successfully connected to MongooseDB.");    
      initial();
    })
    .catch(err => {
        console.log('Could not connect to MongooseDB.');
        process.exit();  
});

// Create a Server
const server = app.listen(config.port, function () {
  //var host = server.address().address
  //var port = server.address().port
  console.log("App listening at http://localhost:%s", config.port)
})


function initial(){
  Role.count( (err, count) => {
    if(!err && count === 0) {
      // USER Role ->
      new Role({
        name: 'USER'
      }).save( err => {
        if(err) return console.error(err.stack)
        console.log("USER_ROLE is added")
      });
 
      // ADMIN Role ->
      new Role({
        name: 'ADMIN'
      }).save( err => {
        if(err) return console.error(err.stack)
        console.log("ADMIN_ROLE is added")
      });
    }
  });
}