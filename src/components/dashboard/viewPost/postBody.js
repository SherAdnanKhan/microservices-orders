import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom";

const PostBody = ({ post }) => {
  const [show, setShow] = useState(false);
  const eventRef = useRef();

  const handleButtonPress = () => {
    eventRef.current = setTimeout(() => {
      setShow(!show);

    }, 2000)
  };

  const handleButtonRelease = () => {
    clearTimeout(eventRef.current);
  };

  return (
    <>
      <div className="valut-icon show-valut">
        <img className="valut-img" alt="" src="/assets/images/vaulticon.png" />
      </div>

      <div className="post-body">
        {post &&
          <div className="image-div"
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
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
            post.other_posts.map((other, index) => (
              <div className="boxes img-align" key={index}>
                <Link to={`/dashboard/viewpost/${other.slug}`}>
                {other.post_type <= 1 &&
                  <img
                    className="valut-img"
                    alt=""
                    src={other.image.path}
                  />
                }
                {other.post_type === 2 &&
                  <video controls>
                    <source src={other.image.path} type="video/mp4" />
                    <source src={other.image.path} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                }
                </Link>
              </div>
            ))
          }
        </div>

      </div>
      <div className="galleryPeek"
      >
        <img           //Gallery peak icon
          className="galleryPeek_img"
          src="/assets/images/gallerypeek.png"
          alt=""
          onClick={() => setShow(!show)}

        />
      </div>
    </>
  )
}

export default PostBody;