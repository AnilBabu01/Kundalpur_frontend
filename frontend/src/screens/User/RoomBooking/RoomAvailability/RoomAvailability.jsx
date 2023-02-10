import React, { useEffect } from 'react';

import AvailabiltyCard from './AvailabiltyCard';
import './RoomAvailability.css';
function RoomAvailability({ setshowRoomOptions }) {
  useEffect(() => {
    setshowRoomOptions(true);
  }, []);
  return (
    <>
      <div className="main_room_availabilty">
        <div className="room_home_main_supper">
          <div className="room_home_main">
            <div className="room_home_main_overlay">
              <div>
                <h2 className="font_text_color">
                  Fresh, quiet and <br /> peaceful Kundalpur Dharamshala
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="form_div_absolute">
          <p>Online Reservation</p>
          <form className="form_div_absolute_form">
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Select Place of Stay</label>
                <input type="text" placeholder="Select" />
              </div>
              <div className="input_div_room">
                <label>Departure Date </label>
                <input type="date" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Date </label>
                <input type="date" />
              </div>
              <div className="input_div_room">
                <label>Departure Time </label>
                <input type="time" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Time </label>
                <input type="time" />
              </div>
              <button>Check Availability</button>
            </div>
          </form>
        </div>
      </div>

      <div className="room_book_card_form_main">
        <p>RoomAvailability</p>
      </div>
      <div className="room_book_card_main_center">
        <AvailabiltyCard />
        <AvailabiltyCard />
        <AvailabiltyCard />
        <AvailabiltyCard />
        <AvailabiltyCard />
      </div>
    </>
  );
}

export default RoomAvailability;
