import React from "react";

const PostFooter = ({ post, handleStoke, handleUnStoke }) => {

  return(
      <div className="post-footer">
         { post && post.post && post.post.title && <h3>{post.post.title}</h3> } 
         <div className="post-footer-bar">
           <div className="poster-footer-stokes-btn" >
            { post && post.has_stroke 
              ? ( <img 
                 className="post-color-icon" 
                 src="/assets/images/strokeiconem.png" 
                 alt="" 
                 onClick={(e) => handleUnStoke(e,post && post.post && post.post.id)
                 }
               />
             ) : <img 
                  className="post-non-color-icon" 
                  src="/assets/images/strokeiconem.png" 
                  alt="" 
                  onClick={(e) => handleStoke(e,post && post.post && post.post.id)} 
               />
         }
         <p>strokes {post && post.post && post.post.stroke_users_count}</p>
       </div> 
       <div className="post-footer-icons">
         <img className="post-non-color-icon" src="/assets/images/crit1.png" alt="" />
       </div> 
       <div className="post-footer-icons">
         <img className="post-non-color-icon" src="/assets/images/ncommnicon.png" alt="" />
       </div>
       </div>
       { post && post.post && post.post.title && <div> <h3>{post.post.title}</h3> </div> } 
     </div>
  )
}
export default PostFooter;