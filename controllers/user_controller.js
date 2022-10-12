const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('user_profile',{

        title:"Profile Page"
    })
}

// user sign up page
module.exports.signUp = function(req,res){
    return res.render(
        'user_sign_up',{
        title:'Codial | Signup'
    
        }
    )
}
// user-sign in page
module.exports.signIn = function(req,res){
    return res.render(
        'user_sign_in',{
            title:'Codial | Signin'
        }
    )
}

// getthe signupdata
module.exports.create = function(req,res){
    console.log(req.body.password,req.body.confirm_password);
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finsing user in signing up');return;}

                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back')
        }
    })
}
module.exports.createSession = function(req,res){
    
}