const express = require('express');
const Joi = require('joi');

const db = require('../db');
const Destination = db.get('messages');//db.get('destination');
const CurLocation = db.get('curLocation');//db.get('curLocation');

// Schema
const locSchema = require('../model/location');

// Get the current location of the boat
exports.getCurLocation = (req, res) => {
    CurLocation.find()
      .then(curLoc => {
          res.json(curLoc[curLoc.length-1]);
      });
}

// Get the destination for the boat
exports.getDestination = (req, res) => {
    Destination.find()
      .then(dest => {
          res.json(dest[dest.length-1]);
      });
}

// Post a new destination for the boat
exports.postDestination = (req, res) => {
    const result = Joi.validate(req.body, locSchema);
    if (result.error === null) {
        const { latitude, longitude } = req.body;
        const boatLocation = {
          boatID : 8,
          latitude,
          longitude,
          date: new Date()
        };
        Destination
          .insert(boatLocation)
          .then(insertedMessage => {
            res.json(insertedMessage);
          });
    } else {
        next(result.error);
    }
}
/*
exports.userContent = (req, res) => {
  User.findOne({ _id: req.userId })
  .select('-_id -__v -password')
  .populate('roles', '-_id -__v')
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with _id = " + req.userId
        });                
      }
      return res.status(500).send({
        message: "Error retrieving User with _id = " + req.userId  
      });
    }
          
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  });
}*/