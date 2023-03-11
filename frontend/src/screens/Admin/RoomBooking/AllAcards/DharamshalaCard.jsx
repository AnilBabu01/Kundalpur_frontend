import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dharam1 from '../../../../assets/dharam1.jpeg';
import homee from '../../../../assets/homee.jpeg';
import Rating from '@mui/material/Rating';
import './DharamshalaCard.css';
function DharamshalaCard() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null > 2);
  console.log(value);
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
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <button
            onClick={() => navigate('/admin-panel/Dharamshala/Details')}
            className="detail_more_btn"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}

export default DharamshalaCard;
