const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){

    Post.findById(req.body.post,function(err,post){
        console.log(req.body.content)
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){console.log('Error in c',err)}
                post.comments.push(comment);
                post.save();

               
                return res.redirect('/');
            })
        }
    })
}

module.exports.destroy = function(req,res){
    console.log('Destroy Session 1');
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                console.log('Destroy Session');
                return res.redirect('back');
            });

        }else{
            return res.redirect('back')
        }
    })
}