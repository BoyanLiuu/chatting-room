const Users= require('../models/userModel');

exports.getGroupPage = function (req, res) {
    let name = req.params.name
    let id = req._passport.session.user;

    Users.findById(id,(err,data)=>{
        if(!err){
            var user = data
            //we pass in user object and current room name

            res.render('groupchat/group',{user:user,name})
        }

    })
    

 
}
