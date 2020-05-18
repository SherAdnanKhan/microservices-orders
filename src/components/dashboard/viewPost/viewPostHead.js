import React from 'react';
import Avatar from "../../common/avatar"

const ViewPortHead = ({ post }) =>{

  return (
      <div className="post-head"> 
        { post && 
          <>
            { post && post.post && post.post.user && <p>{post.post.user.username}</p>}
            { post && post.post && post.post.user.avatars &&  <Avatar avatars={post.post.user.avatars} />}
            { post && 
                post.post && 
                  post.post.user && 
                    post.post.user.art.parent 
                    ? <p>{post.post.user.art.parent.name}/{post.post.user.art}</p>
                    : post.post.user.art.name && <p>{post.post.user.art.name}</p>
            }
          </>
        }
      </div>
    )
  }
export default ViewPortHead;