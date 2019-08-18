const Role = require('./role.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const UserSchema = mongoose.Schema({
    //name: String,
    username: String,
    //email: String,
    password: String,
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
});
 
module.exports = mongoose.model('User', UserSchema);

/*
const Role = require('./role.js');
const Joi = require('joi');

// Schema for validating the destination before sent to database 
const user = Joi.object().keys({
    //name: String,
    username: Joi.string().alphanum().min(5).max(15).required(),
    //email: Joi.string().email({ minDomainAtoms: 2 })
    password: Joi.string().required(),
    roles: [Role] // User or Admin
});
 
module.exports = user;
*/