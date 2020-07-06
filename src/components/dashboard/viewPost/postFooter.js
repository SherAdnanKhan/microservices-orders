import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNcomm, clearNcomm } from "../../../actions/postAction";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const PostFooter = ({ post, handleStoke, handleUnStoke }) => {
  const sliderRef = useRef();
  const history = useHistory();

  const [settings, setSettings] = useState({
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
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
      let slidesToShow = 2;

      if (ncomm.data.length === 3) {
        slidesToShow = 2;
      } else if (ncomm.data.length === 4) {
        slidesToShow = 3;
      } else if (ncomm.data.length > 4) {
        slidesToShow = 4
      }
      setSettings(settings => {
        return {
          ...settings,
          slidesToShow: slidesToShow
        }
      });
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
  };

  return (
    <div className="post-footer">
      <div
        className="my-slider"
        ref={ref => sliderRef.current = ref}
      >
        {ncomm && ncomm.data &&
          <Slider {...settings}>
            {ncomm.data.map((post, index) => (
              <div
                className="tile clickable"
                key={index}
                onClick={() => history.push(`/dashboard/studio/${post.user.slug}`)}
              >
                {post.post_type <= 1 &&
                  <img
                    src={post.image.path}
                    alt=""
                  />
                }
                {post.post_type === 2 &&
                  <video controls>
                    <source src={post.image.path} type="video/mp4" />
                    <source src={post.image.path} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                }
              </div>
            ))}
          </Slider>
        }
        {ncomm && ncomm.data.length === 0 &&
          <h3> No images to show </h3>
        }
      </div>

      {post && post.post && post.post.title &&
        <h3 className="post-title">{post.post.title}</h3>
      }

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

    </div >
  )
}
export default PostFooter;