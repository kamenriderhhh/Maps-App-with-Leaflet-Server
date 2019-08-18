const config = require('../config/config.js');
const Role = require('../model/role.js');
const User = require('../model/user.js');
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signup = (req, res) => {
  
  verifySignUp.checkDuplicateUserNameOrEmail;
  verifySignUp.checkRolesExisted;

  // Save User to Database
  console.log("Processing func -> SignUp");
 
  const user = new User({
      //name: req.body.name,
      username: req.body.username,
      //email: req.body.email,
  });
  bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
      user.password = hash;
  });
 
    // Save a User to the MongoDB
    user.save().then(savedUser => {
    Role.find({
        'name': { $in: req.body.roles.map(role => role.toUpperCase()) }
    }, (err, roles) => {
      if(err) 
        res.status(500).send("Error -> " + err);
 
      // update User with Roles
      savedUser.roles = roles.map(role => role._id);
      savedUser.save(function (err) {
        if (err) 
          res.status(500).send("Error -> " + err);
 
        res.send("User registered successfully!");
      });
    });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
}
 
exports.signin = (req, res) => {
  console.log("Sign-In");
  
  // Check whether the user exist in DB
  User.findOne({ username: req.body.username })
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with Username = " + req.body.username
        });                
      }
      return res.status(500).send({
        message: "Error retrieving User with Username = " + req.body.username
      });
    }
    
    // Check is the password tally or not
    bcrypt.compare(req.body.password, user.password, function(err, res) {
      if (err) {
        // Failed to login due to invalid password
        return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
      }
    });      
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, accessToken: token });
  });
}
 
exports.userContent = (req, res) => {

  authJwt.verifyToken;

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
}
 
exports.adminBoard = (req, res) => {

  authJwt.verifyToken;
  authJwt.isAdmin;

  User.findOne({ _id: req.userId })
  .select('-_id -__v -password')
  .populate('roles', '-_id -__v')
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).send({
          message: "User not found with _id = " + req.userId
        });                
        return;
      }
 
      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });
 
      return;
    }
          
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  });
}
