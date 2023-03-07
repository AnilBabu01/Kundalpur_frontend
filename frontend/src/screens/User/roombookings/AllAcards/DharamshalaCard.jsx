import React from 'react';
import dharam1 from '../../../../assets/dharam1.jpeg';
import homee from '../../../../assets/homee.jpeg';
import './DharamshalaCard.css';
function DharamshalaCard() {
  return (
    <>
      <div className="dharamshal_arc_main">
        <img src={dharam1} alt="hh" />
        <div className="dharamshal_arc_main_name_div_content">
          <div className="dharamshal_arc_main_name_div">
            <img src={homee} alt="dd" />
            <p>Kundalpur</p>
          </div>
          <p>Lala Umrav Singh Jain Dharmshala</p>
          <div className="rating_div">
            <p>₹850 Per Night</p>
            <p>rating</p>
          </div>
          <button className="detail_more_btn">Details</button>
        </div>
      </div>
    </>
  );
}

export default DharamshalaCard;
