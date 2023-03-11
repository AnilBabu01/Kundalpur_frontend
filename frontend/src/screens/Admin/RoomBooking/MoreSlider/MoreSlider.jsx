import React from 'react';
import DharamshalaCard from '../AllAcards/DharamshalaCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MoreSlider.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
function MoreSlider() {
  return (
    <>
      <div className="sjilder_main_div">
        <div className="view_all_main_div">
          <p>Other Dharmshala</p>
          <button> View all</button>
        </div>
        <div className="center_wrap_hai_na">
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
          <DharamshalaCard />
        </div>
      </div>
    </>
  );
}

export default MoreSlider;
