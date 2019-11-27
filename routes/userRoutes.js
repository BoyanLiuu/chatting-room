
const passport =  require('passport');
const User = require('../controllers/authControllers');
var express = require('express')
var userRouter = express.Router()

userRouter.get('/signup',(req, res)=>{
    const errors = req.flash('error')
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
userRouter.post('/signup',User.signUpHelper,User.Validation,passport.authenticate('local.signup',{
    successRedirect:'/home',
    failureRedirect:'/signup', 
    failureFlash:true // allow flash messages
}));

// sign in function
userRouter.get('/',(req, res)=>{
    const errors = req.flash('error')
    return res.render('index',
    {
        title:"Chatting room Log in",
        messages: errors,
        // if error array > 0 then we have an error need to display
        flag :errors.length > 0 
    }
    );
});
// use express-validator to help us validate user.
userRouter.post('/',User.logInHelper,User.Validation,passport.authenticate('local.login',{
    successRedirect:'/home',
    failureRedirect:'/', 
    failureFlash:true // allow flash messages
}));

// facebook log in
userRouter.get('/auth/facebook',passport.authenticate('facebook', {
    scope: 'email'
   
 }));
//It receive  the access token and optional refresh token, as well as profile which contains the authenticated user's Facebook profile
 userRouter.get('/auth/facebook/callback',passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = userRouter;