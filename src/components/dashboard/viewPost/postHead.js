import React from 'react';
import Avatar from "../../common/avatar";

const PostHead = ({ post }) => {
  return (
    <div className="post-head">
      {post &&
        <div className="post-heder-inner">
          {post && post.post && post.post.user && <p >{post.post.user.username}</p>}
          {post && post.post && post.post.user.avatars && <Avatar avatars={post.post.user.avatars} />}
          {post &&
            post.post &&
            post.post.user.art &&
            <>
              {post.post.user.art.parent && post.post.user.art.parent.name + '/'}
              {post.post.user.art.name && post.post.user.art.name}
            </>
          }
        </div>
      }
    </div>
  );
};
export default PostHead;