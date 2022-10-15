const User = require('../models/user')
const Post = require('../models/post')

module.exports.profile = function(req,res){

        User.findById(req.params.id,function(err,user){
            return res.render('user_profile',{

                title:"Codeial Profile Page",
                profile_user:user
              
            })
        })
       
}

// user sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    
    return res.render(
        'user_sign_up',{
        title:'Codial | S ignup'
        }
    )
}
// user-sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
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
    // 1.find the user
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log('Error while find user');
    //         return;
    //     }

    //     if(user){

    //     // 2.1 handle mismatching passwords
    //         if(user.password!=req.body.password){
    //             console.log('Mismatching Password');
    //             return res.redirect('back');
    //         }

    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile')

    //     }
    //     else{
            
    //           // 3.handle user not found 
    //           return res.redirect('back');
    //     }
    // })

    return res.redirect('/');

    
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { res.redirect('/'); }
        
      });

    return res.redirect('/')
}


