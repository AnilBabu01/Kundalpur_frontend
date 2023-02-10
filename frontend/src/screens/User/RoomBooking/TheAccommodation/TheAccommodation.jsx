import React, { useEffect, useState } from 'react';
import RoomBookCard from '../RoomBookCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import RoomPopup from '../RoomPopup';
import './TheAccommodation.css';
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
function TheAccommodation({ setshowRoomOptions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setshowRoomOptions(true);
  }, []);

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
                xs: '70%',
                sm: '60%',
                md: '45%',
              },
            }}
          >
            <RoomPopup handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
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
      <div className="center_main_div_room_card">
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
        <RoomBookCard handleOpen={handleOpen} />
      </div>
    </>
  );
}

export default TheAccommodation;
