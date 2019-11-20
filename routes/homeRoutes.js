const home = require('../controllers/homeControllers');
var express = require('express');
var homeRouter = express.Router();


homeRouter.get('/home',home.getHomePage);



module.exports = homeRouter;