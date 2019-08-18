const Joi = require('joi');

// Schema for validating the destination before sent to database
const location = Joi.object().keys({
    //boatID: Joi.number.min(1).max(10).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

module.exports = location;