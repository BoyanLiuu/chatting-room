var async = require("async");
const games = require('../models/gameModel');
exports.getHomePage = function (req, res) {
    console.log("I am inside getHomePage")
    //run all the function in the array at same times
    async.parallel([function(callback){
        // Retrieve all the data
        games.find({},(err, result)=>{
            callback(err,result);
        })

    }],(err,results) => {
        //get result from first function
        const output  = results[0];
        return res.render('home',{title:'Gaming Hub',output});
    });
 
}