const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // to fetch the comments of post we need very frequently to fetch
    // include the array of all comments in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
}
);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
