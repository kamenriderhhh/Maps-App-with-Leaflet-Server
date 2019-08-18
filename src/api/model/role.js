const mongoose = require('mongoose'), Schema = mongoose.Schema;
 
const RoleSchema = mongoose.Schema({
    name: String
});
 
module.exports = mongoose.model('Role', RoleSchema);

/*
const Joi = require('joi');

// Schema for validating the destination before sent to database 
const role = Joi.object().keys({
    name: Joi.string()
});
 
module.exports = role;
*/