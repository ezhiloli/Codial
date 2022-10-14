const Post = require('../models/post');
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