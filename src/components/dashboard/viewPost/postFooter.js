import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm, clearNcomm } from "../../../actions/postAction";
import SimpleImageSlider from "react-simple-image-slider";
import { useHistory } from "react-router-dom";


const PostFooter = ({ post, handleStoke, handleUnStoke }) => {
  const sliderRef = useRef();
  const history = useHistory();

  const [urls, setUrls] = useState([]);

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
      setUrls(urls => urls = ncomm.data.map(item => {
        return {
          url: item.image.path,
          user: item.user
        }
      }))
      sliderRef.current.scrollIntoView({ behavior: 'auto' });;
    }
  }, [ncomm])

  useEffect(() => {
    return () => {
      dispatch(clearNcomm());
    }
  }, [dispatch]);

  const hasAllowedCritiques = () => {
    return post && post.other_privacy.is_allowed ? true : false;
  }

  return (
    <div className="post-footer">
      {post && post.post && post.post.title &&
        <h3 className="post-title">{post.post.title}</h3>
      }
      <div ref={ref => sliderRef.current = ref}>
        {ncomm && ncomm.data && ncomm.data.length > 0 &&
          <SimpleImageSlider
            onClick={(index) => history.push(`/dashboard/studio/${urls[index].user.slug}`)}
            width={896}
            height={304}
            style={{ cursor: 'pointer' }}
            images={ncomm?.data?.map(item => {
              return {
                url: item.image.path
              }
            })}
          />
        }
        {ncomm && ncomm.data.length === 0 &&
          <h3> No images to show </h3>
        }
      </div>
      <div className="post-footer-bar">
        <div className="poster-footer-stokes-btn">
          {post && post.has_stroke
            ? (
              <img
                className="post-color-icon"
                src="/assets/images/strokeiconfull.png"
                alt=""
                onClick={handleUnStoke}
              />
            ) : (
              <img
                className="post-non-color-icon"
                src="/assets/images/strokeiconem.png"
                alt=""
                onClick={handleStoke}
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
    </div>
  )
}
export default PostFooter;