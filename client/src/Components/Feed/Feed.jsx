import React, { useState } from 'react'
import Status from '../Status/Status'
import Usefetch from '../Hooks/Usefetch'
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { PiShareFatBold } from "react-icons/pi";
import { BASE_URL, token } from '../utils/Config'
import './feed.css'



const Feed = ({forwardedRef}) => {
  const {
    data:postData,
    loading,
    error
  }  = Usefetch(`${BASE_URL}/user/allUsers`)


  const [localPostData, setLocalPostData] = useState(null);


  const handleLike = async(postId) => {

    try {

      const res = await fetch(`${BASE_URL}/post/likePost/${postId}`, {
        method:'POST',
        headers : {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json();

      const updatedLikeCount = data.likeCount;

      const updatedData = postData.map(user => ({
        ...user,
        posts: user.posts.map(post =>
          post.id === postId ? { ...post, likes: updatedLikeCount } : post
        )
      }));

      setLocalPostData(updatedData);

    }catch(error) {
      console.error("Error liking post:", error);
    }

  }


  console.log(postData);
  
  const usersWithPosts = (localPostData || postData)?.filter(data => data.posts && data.posts.length > 0) || [];

  console.log(usersWithPosts);
  

  return (
    <>
  <Status />

    {loading && <p>Loading...</p>}
    {error && <p>Error</p>}
    {!loading && !error && (
        <div ref={forwardedRef} className="feed-container">
          {usersWithPosts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            usersWithPosts.map(user => (
              <div key={user._id} className="user-posts-section">
                <div className="user-info flex">
                <img src={user.profilePic} alt={user.name} className="w-15 h-15 rounded-full border-2 border-amber-800 mt-5 ml-42"/>
                  <p className='text-white ml-3 mt-5'>{user.name}</p>
                  <p className='text-gray-400 text-sm mt-11 pname'>{user.name}</p>
                </div>
                
                <div className="posts-container mt-5 ml-5">
                  {user.posts.map(post => (
                    <div key={post.id} className="post-card border-red-100 radius">
                      {post.image && (
                        <img src={post.image} alt={post.caption || "Post"} className="post-image h-80 ml-35" />
                      )}
                      <div className="post-stats text-white ml-35 mt-5 flex gap-5">
                      <FaRegHeart className='h-7 w-7 cursor-pointer' onClick={() => handleLike(post.id)}/> 
                        <FaRegComment className='h-7 w-7'/> 
                        <PiShareFatBold className='h-7 w-7'/>
                      </div>
                      <div className='text-white ml-35 mt-2'>{post.likes !== undefined ? post.likes : "0"} likes</div>
                      {post.caption && (
                        <div className='flex gap-2 ml-36'>
                          <p className='text-white'>{user.name}</p>
                        <p className="post-caption text-white">{post.caption}</p>
                        </div>
                      )}
                         <div className='flex gap-3'>
                        {post.commentedBy?.length > 0  && ( <span className='text-white ml-36'>{post.commentedBy[0].name}</span>)}                      
                        {post.comment && <span className='text-gray-400 text-sm mt-1'>{post.comment}</span>}
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <hr />
    </>
  )
}

export default Feed