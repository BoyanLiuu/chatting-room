
var async = require("async");
const games = require('../models/gameModel');
const Users= require('../models/userModel');
exports.getHomePage = function (req, res) {
    let id = req._passport.session.user;
    //run all the function in the array at same times
    async.parallel([function(callback){
        
        // Retrieve all the data
        games.find({},(err, result)=>{
            callback(err,result);
        })

    }],(err,results) => {
        //get result from first function
        let output  = results[0];
        //  create additional field in object
        output.forEach((element)=>{
            element.temp_name = element.name.split(" ").join("_")
        });
        // console.log(req.user)
        return res.render('home', {title:'Gaming Hub',output,user:req.user});
    });
 
};

exports.getAboutPage = function (req, res) {
    return res.render('about', {user:req.user});
};

exports.getProfilePage = function (req, res) {
    return res.render('profile', {user:req.user});
};