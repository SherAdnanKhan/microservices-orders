import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImageVideoSlider = ({ ncomm }) => {
  const history = useHistory();
  const sliderRef = useRef();

  const [settings, setSettings] = useState({
    arrows: true,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          speed: 200,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          speed: 200,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

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
      // sliderRef.current.scrollIntoView({ behavior: 'smooth' });;
    }
  }, [ncomm]);

  return (
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
              onClick={() => history.push(`/dashboard/viewpost/${post.slug}`)}
            >
              {post.post_type <= 1 &&
                <img
                  src={post?.image?.path}
                  alt=""
                />
              }
              {post.post_type === 2 &&
                <video>
                  <source src={post?.image?.path} type="video/mp4" />
                  <source src={post?.image?.path} type="video/ogg" />
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
  );
};

export default ImageVideoSlider;
