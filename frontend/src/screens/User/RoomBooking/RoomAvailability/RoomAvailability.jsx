import React, { useEffect, useState } from 'react';
import AvailabiltyCard from './AvailabiltyCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import BookingPopup from './BookingPopup/BookingPopup';
import ViewDetailsPopup from './ViewDetailsPopup/ViewDetailsPopup';
import './RoomAvailability.css';

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
function RoomAvailability({ setshowRoomOptions }) {
  const [open, setOpen] = useState(false);
  const [showDetails, setshowDetails] = useState(false);
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
                xs: '90%',
                sm: '70%',
                md: '70%',
              },
            }}
          >
            {showDetails ? (
              <>
                <ViewDetailsPopup
                  handleClose={handleClose}
                  setshowDetails={setshowDetails}
                />
              </>
            ) : (
              <>
                <BookingPopup handleClose={handleClose} />
              </>
            )}
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
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="Select"
                />
              </div>
              <div className="input_div_room">
                <label>Departure Date </label>
                <input style={{ width: '100%' }} type="date" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Date </label>
                <input style={{ width: '100%' }} type="date" />
              </div>
              <div className="input_div_room">
                <label>Departure Time </label>
                <input style={{ width: '100%' }} type="time" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Time </label>
                <input style={{ width: '100%' }} type="time" />
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
        <AvailabiltyCard
          handleOpen={handleOpen}
          setshowDetails={setshowDetails}
        />
        <AvailabiltyCard
          handleOpen={handleOpen}
          setshowDetails={setshowDetails}
        />
        <AvailabiltyCard
          handleOpen={handleOpen}
          setshowDetails={setshowDetails}
        />
        <AvailabiltyCard
          handleOpen={handleOpen}
          setshowDetails={setshowDetails}
        />
        <AvailabiltyCard
          handleOpen={handleOpen}
          setshowDetails={setshowDetails}
        />
      </div>
    </>
  );
}

export default RoomAvailability;
