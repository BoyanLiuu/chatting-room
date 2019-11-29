const Users= require('../models/userModel');

exports.getGroupPage = function (req, res) {
    let name = req.params.name
    let gpname = name.split("_").join(" ")
    res.render('groupchat/group',{user:req.user,name,gpname})
    
}
