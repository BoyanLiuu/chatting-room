
const passport =  require('passport');
const User = require('../controllers/authControllers');
var express = require('express')
var userRouter = express.Router()

userRouter.get('/',(req, res)=>{
    console.log("hello from get route")
    // console.log(req.flash())
    const errors = req.flash('error')
    console.log(errors)
    return res.render('signup',
    {
        title:"Chatting room Log in",
        messages: errors,
        // if error array > 0 then we have an error need to display
        flag :errors.length > 0 
    }
    );
});

// use express-validator to help us validate user.
userRouter.post('/',User.helper,User.postValidation,passport.authenticate('local.signup',{
    successRedirect:'/',
    failureRedirect:'/signup', 
    failureFlash:true // allow flash messages
}));

module.exports = userRouter;