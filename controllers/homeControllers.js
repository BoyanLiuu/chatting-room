
var async = require("async");
const games = require('../models/gameModel');
exports.getHomePage = function (req, res) {
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
        
        return res.render('home',{title:'Gaming Hub',output});
    });
 
}