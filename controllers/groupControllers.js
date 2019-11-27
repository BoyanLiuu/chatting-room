const Users= require('../models/userModel');

exports.getGroupPage = function (req, res) {
    let name = req.params.name
    res.render('groupchat/group',{user:req.user,name})
    
}
