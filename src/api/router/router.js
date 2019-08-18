const express = require('express');
const dataController = require('../controller/dataController.js');
const controller = require('../controller/controller.js');

const router = express.Router();

router.post('/auth/signup', controller.signup);
router.post('/auth/signin', controller.signin);
router.post('/authed/data/postDestination', dataController.postDestination);

router.get('/authed/user', controller.userContent);
router.get('/authed/admin', controller.adminBoard);
router.get('/authed/data/getDestination', dataController.getDestination);
router.get('/authed/data/getCurLocation', dataController.getCurLocation);


module.exports = router;