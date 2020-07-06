import React, { useState, useRef } from 'react';

const PostBody = ({ post }) => {
  const [show, setShow] = useState(false);
  const eventRef = useRef();

  const handleButtonPress = () => {
    eventRef.current = setTimeout(() => {
      setShow(true);
    }, 2000)
  };

  const handleButtonRelease = () => {
    clearTimeout(eventRef.current);
  };

  return (
    <div className="post-body">
      {post &&
        <div
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonRelease}
        >
          {post.post.post_type === 2
            ? (
              <video
                width="320"
                height="240"
                controls
                style={{ width: "100%", heigth: "100%" }}
              >
                <source src={post.post.image.path} type="video/mp4" />
                <source src={post.post.image.path} type="video/ogg" />
                  Your browser does not support the video tag.
              </video>
            ) : (
              <img src={post.post.image.path} alt="" style={{ width: "100%", heigth: "100%" }} />
            )
          }
        </div>
      }

      <div className={show ? 'right-clicked show' : 'right-clicked'}>
        {post && post.other_posts &&
          post.other_posts.map(other => (
            <div className="boxes img-align">
              <img
                className="valut-img"
                alt=""
                src={other.image.path}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PostBody;