const User = require('../models/userModel');
const Room = require('../models/gameModel');

exports.getAllUser = function (req, res){
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happensw while you get data from all user')
        }else {
            res.json(data)
        }    
      })

};

exports.getsingleUser = function (req, res){
    User.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens while you look for this user')
        }else {
            res.json(data)
        }    
      })

};
exports.deletesingleUser = function (req, res){
    User.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens while you try to delete this user')
        }else {
            res.json(data)
        }    
      })

};
exports.updatesingleUser = function (req, res){
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, result)=>{
        if (err) {
            res.status(500).send('something wrong happened while you update a user')
        }else{
            res.status(204).send(' ');
        }

      });
};

exports.deleteAllUser = function (req, res){
    User.deleteMany({}, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens while you delete all data')
        }else {
            res.status(204).send('All users are deleted')
        }    
      })

};
exports.deleteAllRoom = function (req, res){
    Room.deleteMany({}, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens')
        }else {
            res.status(204).send('All room are deleted')
        }    
      })

};
exports.createUser = function (req, res){
    let new_user = new User(req.body);
    console.log(new_user)
    new_user.save((err, results) => {
    if (err) {
        res.status(500).send(err)
    }
    else {
        res.status(204 ).send('You have successfully sign up a new user')
    }
})
};
exports.createRoom = function (req, res){
    let new_room = new Room(req.body);
    new_room.save((err, results) => {
    if (err) {
        res.status(500).send('Something wrong happens while you create a new room')
    }
    else {
        res.status(204 ).send('You have successfully sign up a new chat room')
    }
})
};
exports.getAllRoom = function (req, res){
    Room.find({}, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens while get all room list')
        }else {
            res.json(data)
        }    
      })

};
exports.getSingleRoom = function (req, res){
    Room.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send('Something wrong happens while you look for this room')
        }else {
            res.json(data)
        }    
      })

};

