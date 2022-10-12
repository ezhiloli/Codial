const passport = require('passport');
const User = require('../models/user');


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        // find user establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
));

// serializing to the user to decide which key is to be in the cookies
// set the userID to the cookie
// the user.id only set on the cookie
passport.serializeUser(function(user,done){

    done(null,user.id);

});

// to check which user is present on the database
// deserialzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
            if(err){
                return done(err);
            }
            return done(null,user);
    });
});

module.exports = passport;
