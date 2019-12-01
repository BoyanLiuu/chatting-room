const home = require('../controllers/homeControllers');
var express = require('express');
var homeRouter = express.Router();


homeRouter.get('/home',home.getHomePage);
homeRouter.get('/about', home.getAboutPage);
homeRouter.get('/profile',home.getProfilePage);

module.exports = homeRouter;