const apiController= require('../controllers/apiControllers');
var express = require('express');
var apiRouter = express.Router();
// 1.get all user
apiRouter.get('/user_list',apiController.getAllUser);
// 2. get user with id
// 3. delete user with id
// 4. update user with id
apiRouter.route('/user/:id')
.get(apiController.getsingleUser)
.delete(apiController.deletesingleUser)
.put(apiController.updatesingleUser);
// 5. delete all user
apiRouter.delete('/delete_user',apiController.deleteAllUser);
// 6. delete all chat room
apiRouter.delete('/delete_room',apiController.deleteAllRoom);
// 7. create new user
apiRouter.post('/create_user',apiController.createUser);
// 8. create new room
apiRouter.post('/create_room',apiController.createRoom);
// 9. get all available room
apiRouter.get('/room_List',apiController.getAllRoom);
// 10. get single room information
apiRouter.get('/room/:id',apiController.getSingleRoom);





module.exports = apiRouter;