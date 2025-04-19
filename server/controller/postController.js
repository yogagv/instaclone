import Post from '../models/PostSchema.js'
import User from '../models/UserSchema.js'

export const registerPost = async (req, res, next) => {

    const {image, caption, likes, comments} = req.body

    try {

        const userId = req.userId

        const user = await User.findById(userId);

        if(!user) {

            return res.status(404).json({success:false, message:'User not found!'});
        }

        let post = new Post({
            image,
            caption,
            likes,
            comments,
            likeCount: likes && likes.length || 0,
            user: {
                id: userId,
                name: user.name,
                profilePic: user.profilePic
            }
        })

        await post.save();

        user.posts.push({
            id: post._id,         
            likes: "0",         
            comment: "",
            image:post.image,
            caption:post.caption         
          });
        await user.save();

        return res.status(200).json({success:true, message:'Post Uploaded Successfully!'});

    }catch(error) {

        console.log(error);
        return res.status(500).json({success:false, message:'Unable to Upload Post!'});
        
    }
}


export const likePost = async(req, res, next) => {

    const postId = req.params.postId;
    const userId = req.userId;

    try {

        const post = await Post.findById(postId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        if(!post) {

            return res.status(404).json({success:false, message:'Post not Found!'});
        }

        const isLiked = post.likes.some(like => like.user && like.user.id && like.user.id.toString() === userId.toString());

            if(isLiked) {

            post.likes = post.likes.filter(like => like.user && like.user.id && like.user.id.toString() !== userId.toString());
                
            } else {

                post.likes.push({
                    user: {
                        id: userId,
                        name: user.name
                    },
                });

            }

            post.likeCount = post.likes.length;

            await post.save();

        //Update the user's own embedded posts
        // const userPostIndex = user.posts.findIndex(p => p.id?.toString() === post._id.toString());

        // if (userPostIndex !== -1) {
        //     await User.updateOne(
        //         { _id: userId, "posts.id": post._id },
        //         {
        //             $set: {
        //                 "posts.$.likes": String(post.likeCount)
        //             }
        //         }
        //     );
        // } else {
        //     await User.updateOne(
        //         { _id: userId },
        //         {
        //             $push: {
        //                 posts: {
        //                     id: post._id,
        //                     likes: String(post.likeCount),
        //                     comment: ""
        //                 }
        //             }
        //         }
        //     );
        // }

        //  Update the post creator's embedded posts
        const postCreatorId = post.user.id?.toString();

        if (postCreatorId && postCreatorId !== userId.toString()) {
            const creator = await User.findOne({
                _id: postCreatorId,
                "posts.id": post._id
            });
                    
            if (creator) {
                const postInUser = creator.posts.find(p => p.id.toString() === post._id.toString());
                        
                if (postInUser) {
                    let updatedLikedBy = Array.isArray(postInUser.likedBy) ? [...postInUser.likedBy] : [];
                            
                    // Fix the logic here - match the like/unlike action
                    if (isLiked) {
                        // User is unliking the post, remove from likedBy
                        updatedLikedBy = updatedLikedBy.filter(u => u.id.toString() !== userId.toString());
                    } else {
                        // User is liking the post, add to likedBy if not already there
                        const alreadyLiked = updatedLikedBy.some(u => u.id.toString() === userId.toString());
                        if (!alreadyLiked) {
                            updatedLikedBy.push({ id: userId, name: user.name });
                        }
                    }
                            
                    await User.updateOne(
                        { _id: postCreatorId, "posts.id": post._id },
                        {
                            $set: {
                                "posts.$.likes": String(post.likeCount),
                                "posts.$.likedBy": updatedLikedBy
                            }
                        }
                    );
                }
            }
        }
        
    
              return res.status(200).json({success:true, message: isLiked ? 'Post UnLiked!' : 'Post Liked', likeCount: post.likeCount});

    }catch(error) {

        console.log(error);
        
        return res.status(500).json({success:false, message:'Unable to process like!'})
    }

}



export const commentPost = async(req, res, next) => {

    const postId = req.params.postId;
    const userId = req.userId;

    try {

        const post = await Post.findById(postId);

        const user = await User.findById(userId);

        if(!post) {

            return res.status(404).json({success:false, message:'Post not Found!'});
        }

        const isCommented = post.comments.some(comment => comment.user && comment.user.id && comment.user.id.toString() === userId.toString());

            if(isCommented) {

            post.comments = post.comments.filter(comment => comment.user && comment.user.id && comment.user.id.toString() !== userId.toString());
                
            }

            else {

                post.comments.push({
                    user: {
                        id: userId,
                        name: user.name
                    },

                    comment: req.body.comment
                }); 
            }

            post.commentCount = post.comments.length;

            await post.save();


        // const userPostIndex = user.posts.findIndex(p => p.id?.toString() === post._id.toString());

        // if (userPostIndex !== -1) {
        //     await User.updateOne(
        //         { _id: userId, "posts.id": post._id },
        //         {
        //             $set: {
        //                 "posts.$.comment": req.body.comment
        //             }
        //         }
        //     );
        // } else {
        //     await User.updateOne(
        //         { _id: userId },
        //         {
        //             $push: {
        //                 posts: {
        //                     id: post._id,
        //                     likes: String(post.likeCount || 0),
        //                     comment: req.body.comment,
        //                 }
        //             }
        //         }
        //     );
        // }

        //  Update post creator’s embedded post data
        // const postCreatorId = post.user?.id?.toString();

        // if (postCreatorId && postCreatorId !== userId.toString()) {
        //     await User.updateOne(
        //         { _id: postCreatorId, "posts.id": post._id },
        //         {
        //             $set: {
        //                 "posts.$.comment": req.body.comment
        //             }
        //         }
        //     );
        // }


        const postCreatorId = post.user.id?.toString();

        if (postCreatorId && postCreatorId !== userId.toString()) {
            const creator = await User.findOne({
                _id: postCreatorId,
                "posts.id": post._id
            });
                    
            if (creator) {
                const postInUser = creator.posts.find(p => p.id.toString() === post._id.toString());
                        
                if (postInUser) {
                    let updatedCommentedBy = Array.isArray(postInUser.commentedBy) ? [...postInUser.commentedBy] : [];
                            
                    // Fix the logic here - match the like/unlike action
                    if (isCommented) {
                        // User is unliking the post, remove from likedBy
                        updatedCommentedBy = updatedCommentedBy.filter(u => u.id.toString() !== userId.toString());
                    } else {
                        // User is liking the post, add to likedBy if not already there
                        const alreadyCommented = updatedCommentedBy.some(u => u.id.toString() === userId.toString());
                        if (!alreadyCommented) {
                            updatedCommentedBy.push({ id: userId, name: user.name });
                        }
                    }
                            
                    await User.updateOne(
                                { _id: postCreatorId, "posts.id": post._id },
                                 {
                                     $set: {
                                         "posts.$.comment": req.body.comment,
                                         "posts.$.commentedBy": updatedCommentedBy
                                     }
                                 }
                             );
                }
            }
        }


              return res.status(200).json({success:true, message: 'Post Commented', commentCount: post.commentCount});

    }catch(error) {

        console.log(error);
        
        return res.status(500).json({success:false, message:'Unable to process comment!'})
    }

}

export const getAllPost = async(req, res, next) => {

    try {

        const post = await Post.find()

        return res.status(200).json({success:true, message:'Retrived all Posts', post});

    }catch(error) {

        return res.status(404).json({success:false, message:'Unable to retrive posts.'})
    }
}

export const getPostById = async(req, res, next) => {

    const userId = req.params.id;

    try{

        const post = await Post.find({$or: [
            { 'user.id': userId },
            { 'user': userId },
            { 'userId': userId }
          ]})

        if(!post || post.length === 0) {

            return res.status(404).json({success:false, message:'Post not found!'});
        }

            return res.status(200).json({success:true, message:'Post found Successfully', post})

    }catch(error) {

        console.log(error);
        
        return res.status(500).json({success:false, message:'Internal Server Error!'})
    }

}


export const updateComment = async (req, res, next) => {

    const { postId, commentId } = req.params;

    const userId = req.userId;

    try {

        const post = await Post.findById(postId)

        if(!post) {

            return res.status(404).json({success:false, message:'Post not found!'});
        }


        const comment = post.comments.find(c => {
            return c.user && c.user.id && c.user.id.toString() === userId.toString();
          });
      
          if (!comment) {
    
            return res.status(404).json({ success: false, message: "Comment not found!" });
          
        }
      
          if (comment.user.id.toString() !== userId.toString()) {
    
            return res.status(403).json({ success: false, message: "Not authorized to delete this comment." });
          
        }
      

        comment.comment = req.body.comment;

        await post.save();

        await User.updateOne(
            { _id: userId, "posts.id": post._id },
            {
                $set: {
                    "posts.$.comment": req.body.comment
                }
            }
        );


    const postCreatorId = post.user?.id?.toString();

    if (postCreatorId && postCreatorId !== userId.toString()) {
      await User.updateOne(
        { _id: postCreatorId, "posts.id": post._id },
        {
          $set: {
            "posts.$.comment": req.body.comment
          }
        }
      );
    }
      
          return res.status(200).json({ success: true, message: "Comment Updated!", updatedComment: comment });

    } catch(error) {

        return res.status(500).json({success:false, message:'Unable to update the comment!'})

    }
}


export const deleteComment = async (req, res, next) => {

    const { postId, commentId } = req.params;

    const userId = req.userId;
  
    try {

      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found!" });
      }
  
      // Check if comment exists and belongs to the user

      const comment = post.comments.find(c => {
        return c.user && c.user.id && c.user.id.toString() === userId.toString();
      });
  
      if (!comment) {

        return res.status(404).json({ success: false, message: "Comment not found!" });
      
    }
  
      if (comment.user.id.toString() !== userId.toString()) {

        return res.status(403).json({ success: false, message: "Not authorized to delete this comment." });
      
    }
  
      // Remove the comment
      post.comments = post.comments.filter(c => c._id.toString() !== commentId);

      post.commentCount = post.comments.length;

      await post.save();

      await User.updateOne(
        { _id: userId, "posts.id": post._id },
        {
          $set: {
            "posts.$.comment": ""
          }
        }
      );

      const postCreatorId = post.user?.id?.toString();

    if (postCreatorId && postCreatorId !== userId.toString()) {
      await User.updateOne(
        { _id: postCreatorId, "posts.id": post._id },
        {
          $set: {
            "posts.$.comment": ""
          }
        }
      );
    }
  
      return res.status(200).json({ success: true, message: "Comment deleted!", commentCount: post.commentCount });
  
    } catch (error) {

      console.log(error);
      
      return res.status(500).json({ success: false, message: "Unable to delete comment!" });
    }
  };
  

  export const updatePost = async (req, res, next) => {

    const postId = req.params.postId;
    const userId = req.userId;

    const { image, caption } = req.body;

    try {

        console.log(userId);

        const post = await Post.findById(postId);
        
        if (!post) {

            return res.status(404).json({ success: false, message: "Post not found!" });
        }

        if (!post.user || !post.user.id) {

            return res.status(400).json({ success: false, message: "Post creator information is missing!" });
        }
        
        if (post?.user?.id.toString() !== userId) {

            console.log(post.user.id);
            

            return res.status(403).json({ success: false, message: "Not authorized to update this post." });
          }

          console.log(post.user.id);
          console.log(userId);
          
          

          if (caption) post.caption = caption;
          if (image) post.image = image;
          await post.save();

          await User.updateOne(
            { _id: userId, "posts.id": post._id },
            {
              $set: {
                "posts.$.caption": post.caption,
                "posts.$.image": post.image,
                "posts.$.updatedAt": new Date()
              }
            }
          );

            return res.status(200).json({success:true, message:'Post Updated Successfully!'});

    } catch(error) {

            
            return res.status(500).json({success:false, message:'Unable to update post!'});
    }

  }



  export const deletePost = async (req, res, next) => {

    const postId = req.params.postId;
    const userId = req.userId;

    try {

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        console.log(post);
        
        if(!user) {

            return res.status(404).send({success:false, message:'User not found'});
        }

        if (!post) {

            return res.status(404).json({ success: false, message: "Post not found" });
          }

        if (post.user?.id?.toString() !== userId.toString()) {

            return res.status(403).json({ success: false, message: "Not authorized to delete this post" });

        }

        await Post.findByIdAndDelete(postId);

        await User.updateOne(
            { _id: userId },
            { $pull: { posts: { id: postId } } }
          );

          await User.updateMany(
            { _id: userId },
            { $pull: { posts: { id: postId } } }
          );

            return res.status(200).send({success:true, message:'Post Deleted Successfully!'});

        
    }catch(error) {

            console.log(error);
            
            return res.status(500).send({success:false, message:'Unable to delete post'});

    }

  }