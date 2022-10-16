const Post = require('../models/post');
const User = require('../models/user');


// 
//      ********* GLOBAL ERROR FUNCTION
// 
function errorHandling(err){
    req.flash('error',err);
}


module.exports.home =async function(req,res){

    // Post.find({},function(err,posts){
       
    // })

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        let users = await User.find({});
 
                return res.render('home',{
                    title:'Codeial-Home',
                    posts:posts,
                    all_users:users
        }); 
    }catch(err){
        errorHandling(err);
    }
    // return res.render('home',{
    //     title:'home',
    // })
}