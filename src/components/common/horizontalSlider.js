import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HorizontalSlider = ({ children }) => {
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
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  });

  return (
    <div
      className="my-slider-horizontal"
      ref={ref => sliderRef.current = ref}
    >
      <Slider {...settings}>
        {children && children}
      </Slider>
    </div>
  );
};

export default HorizontalSlider;
