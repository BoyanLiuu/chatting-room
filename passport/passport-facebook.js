'use strict'
const User = require('../models/userModel');
const faceBookStrategy = require('passport-facebook').Strategy;

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

passport.use(new faceBookStrategy({
    clientID: process.env.Facebook_ID,
    clientSecret: process.env.Facebook_Secret,
    profileFields: ['email', 'displayName', 'photos'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true
    
}, (req, token, refreshToken, profile, done) => {
    
    User.findOne({facebook:profile.id}, (err, user) => {
       if(err){
           return done(err);
       }
        
        if(user){
            return done(null, user);
        }else{
            const newUser = new User();
            newUser.facebook = profile.id;
            newUser.fullname = profile.displayName;
            newUser.username = profile.displayName;
            newUser.email = profile._json.email;
            newUser.photo = 'https://graph.facebook.com/'+profile.id+'/picture?type=large';
            newUser.fbtokens.push({token:token});
            
            newUser.save((err) => {
                return done(null, newUser);
            })
        }
    })
}));
}