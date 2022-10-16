const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(req,res){
   
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id,
        });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"Post Created !!"
                })
            }
            req.flash('success','Post Created');
            return res.redirect('back');
    }catch(err){
        console.log('Error while creainv');
        return;
    }
   
}

module.exports.destroy =async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
            // .id means objectId into String
            if(post.user == req.user.id){
                post.remove();
    
                await Comment.deleteMany({post:req.param.id});

                req.flash('success',"Post Deleted");

                return res.redirect('back');
            }
            else{
                console.log('Error while deleting Post')
                return res.redirect('back');
            }
        }catch(err){
            console.log('Error',err);
            return;
        }
}