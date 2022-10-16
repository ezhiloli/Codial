{
    // method to submit the data form using AJAX
    console.log('Hello');
    let createPost = function(){
        console.log('Post form')
        let newPostForm = $('#new-post-form');
           
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),//serialize like Json
                success:function(data){
                    
                    let newPost = newPostDOM(data.data.post)
                    $('#post-list-container>ul').prepend(newPost);
                },error : function(err){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();

    // create Post in DOM

    let newPostDOM = function(post){
        return $(`
                <li id="post-${post._id}">
                <div class="user-post-list">
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                        ${post.content}
                         <small>
      post by  <a href="/users/profile">${post.user.name} </a>
    </small>
    </div>
    <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to Add Comment ..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add"> 
            </form>
        <div class="list-of-comments">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
    </div>
</li>
        
        `)
    }
}
