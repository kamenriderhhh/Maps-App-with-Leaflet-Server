module.exports = {
  'secret': 'ecosailsuper-secret-key',
  saltRounds : 10,
  port : 5000, //process.env.PORT || 5000;
  DBurl: 'mongodb://kero:vnc2019@localhost:27017/EcoSail',
  LOCurl: 'mongodb://kero:vnc2019@localhost:27017/SailNav',
  ROLEs: ['USER', 'ADMIN'],
  MQTT: [
    host = 'mqtt://52.221.214.117',
    username = 'sailnav', // mqtt credentials if these are needed to connect
    password = 'usm2019',
    port = 1883
  ]
};