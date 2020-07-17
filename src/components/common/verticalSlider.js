import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const VerticalSlider = ({ children, slidesToShow = 3, slidesToScroll = 3 }) => {
  const sliderRef = useRef();

  function PrevArrow({ onClick, style }) {
    return (
      <i
        className="arrow-up fa fa-caret-up fa-3x"
        onClick={onClick}
        style={{ display: 'block' }}
      >
      </i>
    );
  }

  function NextArrow({ onClick, style }) {
    return (
      <i
        className="arrow-down fa fa-caret-down fa-3x"
        onClick={onClick}
        style={{ display: 'block' }}
      >
      </i>
    );
  }

  const [settings] = useState({
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    vertical: true,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
  });

  return (
    <div
      className="my-slider-vertical"
      ref={ref => sliderRef.current = ref}
    >
      <Slider {...settings}>
        {children && children}
      </Slider>
    </div>
  );
};

export default VerticalSlider;
