const mqtt = require('mqtt');
const db = require('../db');
const config = require('../config/config');

const CurLocation = db.get('curLocation');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = config.MQTT[0];
    this.username = config.MQTT[1];
    this.password = config.MQTT[2];
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password }, config.MQTT[3]);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('sailnav', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      var str = message.toString();
      str = str.substring(1, str.length-1).split(',');
      const bid = str[0]
      const latitude = str[1];
      const longitude = str[2];
      const boatLocation = {
        bid,
        latitude,
        longitude,
        date: new Date()
      };
      //console.log(boatLocation);
      CurLocation.insert(boatLocation);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }
}

module.exports = MqttHandler;