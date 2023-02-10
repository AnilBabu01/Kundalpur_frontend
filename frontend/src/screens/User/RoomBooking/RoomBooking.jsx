import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomBookCard from './RoomBookCard';
import './RoomBooking.css';
function RoomBooking() {
  const navigate = useNavigate();
  const submithandle = (e) => {
    e.preventDefault();

    navigate('/roombooking');
  };
  return (
    <>
      <div className="room_home_main_supper">
        <div className="room_home_main">
          <div className="room_home_main_overlay">
            <div>
              <h2 className="font_text_color">
                Fresh, quiet and <br /> peaceful Kundalpur Dharamshala
              </h2>
              <p className="font_text_color_p">
                Fool tho sonsation of staying in a hotel cabin! Bosidos boing{' '}
                <br />
                comfortablo, this hotel cabin prioritizos technology and
                <br />
                socurity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Reservation_main_div">
        <div className="formCard_main_div">
          <form onSubmit={submithandle} className="formCard_main_div_form">
            <p>Online Reservation</p>
            <div className="input_div_room">
              <label>Select Dharamshala</label>
              <input type="text" />
            </div>
            <div className="input_div_room">
              <label>Arrival Date </label>
              <input type="text" />
            </div>
            <div className="input_div_room">
              <label>Arrival Time </label>
              <input type="text" />
            </div>
            <div className="input_div_room">
              <label>Departure Date </label>
              <input type="text" />
            </div>
            <div className="input_div_room">
              <label>Departure Time </label>
              <input type="text" />
            </div>
            <button>Check Availability</button>
          </form>
        </div>

        <div className="card_dharamShala_main">
          <RoomBookCard />
          <RoomBookCard />
          <RoomBookCard />
          <RoomBookCard />
        </div>
      </div>
      <div
        onClick={() => navigate('/roombooking/theaccommodation')}
        className="view_all_text"
      >
        <p>View All</p>
      </div>
    </>
  );
}

export default RoomBooking;
