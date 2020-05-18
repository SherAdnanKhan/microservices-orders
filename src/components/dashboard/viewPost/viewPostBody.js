import React from 'react';

const viewPostBody = ({ post }) =>{
  return (
    <div className="post-body">
      { post && post.post && post.post.image && post.post.image.path && <img src={post.post.image.path} alt="" stye={{width:"100%", heigth:"100%"}} />}
   </div>
  )
} 
export default viewPostBody;