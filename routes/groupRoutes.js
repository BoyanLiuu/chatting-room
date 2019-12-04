const groupController = require('../controllers/groupControllers');
var express = require('express');
var groupRouter = express.Router();


groupRouter.route('/group/:name').get(groupController.getGroupPage).post(groupController.groupPostPage)


module.exports = groupRouter;