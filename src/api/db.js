const config = require('./config/config.js')

const monk = require('monk');
//const db = monk(process.env.DATABASE_URL);
const db = monk(config.LOCurl)

module.exports = db;