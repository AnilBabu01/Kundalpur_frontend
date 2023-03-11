import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homee from '../../../../assets/homee.jpeg';
import Rating from '@mui/material/Rating';
import './RoomCard.css';
function RoomCard({ img }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null > 2);
  return (
    <>
      <div className="room_card_main_div">
        <img className="room_card_main_divimg" src={img} alt="dd" />
        <div className="main_room_div_deell">
          <p>Lala Umrav Singh Jain Dharmshala</p>
          <p className="main_text_deltails">AC</p>

          <div className="dharamshal_arc_main_name_div13">
            <img
              className="dharamshal_arc_main_name_div13img"
              src={homee}
              alt="dd"
            />
            <p>Kundalpur</p>
          </div>
          <div>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <button onClick={() => navigate('/admin-panel/room/booking')}>
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomCard;
