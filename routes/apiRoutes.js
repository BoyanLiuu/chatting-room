const apiController= require('../controllers/apiControllers');
var express = require('express');
var apiRouter = express.Router();


apiRouter.get('/home',home.getHomePage);



module.exports = apiRouter;