import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm } from "../../../actions/postAction";
import SimpleImageSlider from "react-simple-image-slider";

const PostFooter = ({ post, handleStoke, handleUnStoke }) => {
  const sliderRef = useRef();

  const dispatch = useDispatch();
  const {
    postView: { ncomm },
  } = useSelector(state => state);

  const handleNcomm = post => {
    console.log(post)
    dispatch(getNcomm(post.post.slug));
  };

  useEffect(() => {
    if (ncomm) {
      sliderRef.current.scrollIntoView({ behavior: 'auto' });;
    }
  })

  const hasAllowedCritiques = () => {
    return post && post.other_privacy.is_allowed ? true : false;
  }

  return (
    <div className="post-footer">
      {post && post.post && post.post.title &&
        <h3 className="post-title">{post.post.title}</h3>
      }
      <div className="post-footer-bar">
        <div className="poster-footer-stokes-btn" >
          {post && post.has_stroke
            ? (
              <img
                className="post-color-icon"
                src="/assets/images/strokeiconfull.png"
                alt=""
                onClick={(e) => handleUnStoke(e, post && post.post && post.post.id)}
              />
            ) : (
              <img
                className="post-non-color-icon"
                src="/assets/images/strokeiconem.png"
                alt=""
                onClick={(e) => handleStoke(e, post && post.post && post.post.id)}
              />
            )
          }
          <p>strokes {post && post.post && post.post.stroke_users_count}</p>
        </div>
        {hasAllowedCritiques() &&
          <div className="post-footer-icons">
            <img className="post-non-color-icon open-commet" src="/assets/images/crit1.png" alt="" />
          </div>
        }
        <div className="post-footer-icons action-w">
          <img
            className="post-non-color-icon"
            src="/assets/images/ncommnicon.png"
            onClick={() => handleNcomm(post)}
            alt=""
          />
        </div>
      </div>
      {post && post.post && post.post.title && <div> <h3>{post.post.title}</h3> </div>}
      <div ref={ref => sliderRef.current = ref}>
        {ncomm && ncomm.data &&
          <SimpleImageSlider

            width={896}
            height={504}
            images={ncomm.data.map(item => {
              return {
                url: item.image.path
              }
            })}
          />
        }
      </div>
    </div>
  )
}
export default PostFooter;