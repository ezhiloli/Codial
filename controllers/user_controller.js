const User = require('../models/user')
const Post = require('../models/post')
const fs = require('fs');
const path = require('path');



// 
//      ********* GLOBAL ERROR FUNCTION
// 

function errorHandling(err){
    req.flash('error',err);
}


module.exports.profile = function(req,res){

        User.findById(req.params.id,function(err,user){
            return res.render('user_profile',{
                title:"Codeial Profile Page",
                profile_user:user
              
            })
        })
       
}

module.exports.update = async function(req,res){

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','Details Updated');
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('Multer Error',err);}

                user.name = req.body.name;
                user.email = req.body.email

                if(req.file){
                    // this is saving path of the uploaded file into avatar field in the user
                    if(user.avaatr){

                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))

                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    console.log(user.avatar);

                }
                user.save();
                return res.redirect('back');

            });

        }catch(err){
            req.flash('success','Details Updated');
            return res.redirect('back');
        }

    }else{

    }
}

// user sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        req.flash('error','Already Signed in! Please Sign out')
        return res.redirect('/users/profile')
    }
    
    req.flash('success','Account created')
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
    req.flash('success','Loggen in Successfully');
    return res.redirect('/');

    
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { }
      });
    req.flash('success','sign out successfully');
    return res.redirect('/')
}


