const passport = require('passport');
const User = require('../models/user');


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        // find user establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password){
                req.flash('error','Invalid userName/password');
                return done(null,false);
            }
            console.log('User Authenticaton Successfull');
            return done(null,user);
        })
    }
));

// serializing to the user to decide which key is to be in the cookies
// set the userID to the cookie
// the user.id only set on the cookie
passport.serializeUser(function(user,done){

    console.log('Serialzing function');
    done(null,user.id);

});

// to check which user is present on the database
// deserialzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
            if(err){
                console.log('Error in finding user')
                return done(err);
            }
            return done(null,user);
    });
});


//sending data current signing in user data to views 
// check user is authenticatd

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contianing the current signed in user from the cookie and we are just sending to the locals for the views
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;
