const monk = require('monk');
//const db = monk(process.env.DATABASE_URL);
const db = monk('kero:vnc2019@localhost:27017/SailNav')

module.exports = db;