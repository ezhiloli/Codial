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

}
module.exports.createSession = function(req,res){
    
}