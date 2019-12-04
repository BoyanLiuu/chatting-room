const Users = require('../models/userModel');
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
    async.parallel([(callback) => {
            if (req.body.receiver) {
                Users.update({
                    'username': req.body.receiver,
                    'request.userId': {
                        $ne: req.user._id
                    },
                    'friendsList.friendId': {
                        $ne: req.user._id
                    }
                }, {
                    $push: {
                        request: {
                            userId: req.user._id,
                            username: req.user.username
                        }
                    },
                    $inc: {
                        totalRequest: 1
                    }
                }, (err, count) => {
                    callback(err, count);
                })
            }

        }, (callback) => {
            if (req.body.receiver) {
                Users.update({
                        'username': req.body.receiver,
                        'sentRequest.username': {
                            $ne: req.body.receiver
                        }
                    }, {
                        $push: {
                            request: {
                                userId: req.user._id,
                                username: req.user.username
                            }
                        }
                    }

                    , (err, count) => {
                        callback(err, count);

                    });

            }

        }

    ], (err, results) => {
        res.redirect('/group/' + req.params.name);
    });

}