const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req,res){
    console.log(req.body.content);

  console.log('Request User ID',req.user);
    Post.create({
        content:req.body.content,
        user:req.user._id,
    },
        function(err,post){
        if(err){
            console.log('error');
            return;
        }
        
        return res.redirect('back');

    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means objectId into String
        console.log("REQUEST.PARAMS",req.params);
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.param.is},function(err){
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}