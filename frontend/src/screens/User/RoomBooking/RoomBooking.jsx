import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomBookCard from './RoomBookCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import RoomPopup from './RoomPopup';
import './RoomBooking.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};
function RoomBooking() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submithandle = (e) => {
    e.preventDefault();

    navigate('/roombooking');
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: {
                xs: '90%',
                sm: '50%',
                md: '45%',
              },
            }}
          >
            <RoomPopup handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
      <div className="room_home_main_supper" id="roomsss">
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

              <select>
                <option>Select</option>
              </select>
            </div>
            <div className="input_div_room">
              <label>Arrival Date </label>
              <input type="date" />
            </div>
            <div className="input_div_room">
              <label>Arrival Time </label>
              <input type="time" />
            </div>
            <div className="input_div_room">
              <label>Departure Date </label>
              <input type="date" />
            </div>
            <div className="input_div_room">
              <label>Departure Time </label>
              <input type="time" />
            </div>
            <button>Check Availability</button>
          </form>
        </div>

        <div className="card_dharamShala_main">
          <RoomBookCard handleOpen={handleOpen} />
          <RoomBookCard handleOpen={handleOpen} />
          <RoomBookCard handleOpen={handleOpen} />
          <RoomBookCard handleOpen={handleOpen} />
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
