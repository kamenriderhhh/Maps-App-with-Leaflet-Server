const express = require('express');
const Joi = require('joi');

const db = require('../db');
const messages = db.get('messages');
const curLocation = db.get('curLocation');


const schema = Joi.object().keys({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const router = express.Router();

router.get('/', (req, res) => {
  curLocation
    .find()
    .then(allLocation => {
      res.json(allLocation);
    });
});

router.get('/destination', (req, res) => {
  messages
    .find()
    .then(allMessages => {
      res.json(allMessages);
    });
});

router.post('/', (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const { latitude, longitude } = req.body;
    const boatLocation = {
      latitude,
      longitude,
      date: new Date()
    };
    messages
      .insert(boatLocation)
      .then(insertedMessage => {
        res.json(insertedMessage);
      });
  } else {
    next(result.error);
  }
});

module.exports = router;
