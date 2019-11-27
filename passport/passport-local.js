
const User = require('../models/userModel');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        //if no error, this would be null.
        done(err,user);
    });


});

//handle sign up function
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({'email':email},(err,user)=>{
        //if we have some kinds of network error 
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,req.flash('error','User with email already exist'));
        }
        // if we do not have this account , we created one.
        const newUser =  new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.save((err)=>{
            return done(null,newUser);
        });
    });
}));


//handle User log in function
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if(err){
           return done(err);
        }
        
        const messages = [];
        if(!user || !user.validPassword(password)){
            messages.push('Email Does Not Exist or Password is Invalid');
            return done(null, false, req.flash('error', messages));
        }
        
        return done(null, user);
    }).select('+password');
    // since in the schema , we set password as select false, so we have specifically yo let password we were hidding back to showing
})); 
}