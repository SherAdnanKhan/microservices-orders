import React, { useRef, useState } from 'react';
//import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const MySlider = ({ children, slidesToShow = '' }) => {
  const sliderRef = useRef();
  function PrevArrow({ onClick, style }) {
    return (
      <i
        className="arrow-up fa fa-caret-up fa-3x"
        onClick={onClick}
      // style={{ display: 'none' }}
      >
      </i>
    );
  }
  function NextArrow({ onClick, style }) {
    return (
      <i
        className="arrow-down fa fa-caret-down fa-3x"
        onClick={onClick}
      // style={{ display: 'none' }}
      >
      </i>
    );
  }

  const [settings] = useState({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  });

  return (
    <div
      className="my-slider"
      ref={ref => sliderRef.current = ref}
    >
      <Slider {...settings}>
        {children && children}
      </Slider>
    </div>
  );
};
export default MySlider;