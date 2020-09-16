import React from 'react';
import Avatar from "../../common/avatar";
import { Link } from 'react-router-dom';


const PostHead = ({ post, userId }) => {
  return (
    <div className="post-head">
      {post &&
        <div className="post-heder-inner">
          {<p>{post.user.username}</p>}
          {userId === post.user.id &&
            <Link to="/dashboard/my-studio" >
              <Avatar
                user={post.user}
              />
            </Link>
          }

          {userId !== post.user.id &&
            <Link to={`/dashboard/studio/${post.user.slug}`} >
              <Avatar
                user={post.user}
              />
            </Link>
          }
          <>
            {post?.user?.art?.parent && post.user.art.parent.name + '/'}
            {post?.user?.art?.name && post.user.art.name}
          </>
        </div>
      }
    </div >
  );
};

export default PostHead;