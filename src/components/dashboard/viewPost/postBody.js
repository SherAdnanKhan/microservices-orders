import React from 'react';

const PostBody = ({ post }) => {
  return (
    <div className="post-body">
      {post &&
        <>
          {post.post_type === 2
            ? (
              <video
                width="320"
                height="240"
                controls
                style={{ width: "100%", heigth: "100%" }}
              >
                <source src={post.image.path} type="video/mp4" />
                <source src={post.image.path} type="video/ogg" />
                  Your browser does not support the video tag.
              </video>
            ) : (
              <img src={post.image.path} alt="" style={{ width: "100%", heigth: "100%" }} />
            )
          }

        </>
      }
    </div>
  )
}
export default PostBody;