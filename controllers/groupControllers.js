const Users = require('../models/userModel');
const GroupMessage = require('../models/groupmessage');
const async = require("async");
exports.getGroupPage = (req, res) => {
    let name = req.params.name
    let gpname = name.split("_").join(" ")
    res.render('groupchat/group', {
        user: req.user,
        name,
        gpname
    })

}

exports.groupPostPage = (req, res) => {
    console.log("I am inside group")
    // async.parallel([(callback) => {
    //         if (req.body.receiver) {
    //             Users.update({
    //                 'username': req.body.receiver,
    //                 'request.userId': {
    //                     $ne: req.user._id
    //                 },
    //                 'friendsList.friendId': {
    //                     $ne: req.user._id
    //                 }
    //             }, {
    //                 $push: {
    //                     request: {
    //                         userId: req.user._id,
    //                         username: req.user.username
    //                     }
    //                 },
    //                 $inc: {
    //                     totalRequest: 1
    //                 }
    //             }, (err, count) => {
    //                 callback(err, count);
    //             })
    //         }

    //     }, (callback) => {
    //         if (req.body.receiver) {
    //             Users.update({
    //                     'username': req.body.receiver,
    //                     'sentRequest.username': {
    //                         $ne: req.body.receiver
    //                     }
    //                 }, {
    //                     $push: {
    //                         request: {
    //                             userId: req.user._id,
    //                             username: req.user.username
    //                         }
    //                     }
    //                 }

    //                 , (err, count) => {
    //                     callback(err, count);

    //                 });

    //         }

    //     }

    // ], (err, results) => {
    //     res.redirect('/group/' + req.params.name);
    // });
    async.parallel([
        function(callback){

            const group_msg = new GroupMessage();
            //who send current message
            group_msg.sender = req.user._id;
            group_msg.body = req.body.msg;
            group_msg.room = req.body.room;
            group_msg.createdAt = new Date();
            console.log(group_msg)
            group_msg.save((err, msg) => {
                callback(err, msg);
            });

        }
    ], (err, results) => {
        res.redirect('/group/'+req.params.name);
    });

}