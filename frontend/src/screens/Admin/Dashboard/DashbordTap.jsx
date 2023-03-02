import React, { useState, useEffect } from 'react';
import Donation from './Donation/Donation';
import ManualDonation from './Donation/ManualDonation';
import OnlineDonation from './Donation/OnlineDonation';
import RoomBooking from './RoomBooking/RoomBooking';
import OnlineRoomBooking from './RoomBooking/OnlineRoomBooking';
import GuestInRoom from './RoomBooking/GuestInRoom';
import EmployeeElectronic from './EmployeeDetails/EmployeeElectronic';
import EmployeeGuestInRoom from './EmployeeDetails/EmployeeGuestInRoom';
import EmployeeManualDonation from './EmployeeDetails/EmployeeManualDonation';
import EmployeeRoombooking from './EmployeeDetails/EmployeeRoombooking';
import Print from '../../../assets/Print.png';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PrintAlladmin from '../Dashboard/PrintAll/PrintAlladmin';
const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
const DashbordTap = ({ setopendashboard }) => {
  const [userrole, setuserrole] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintAlladmin handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>
      <div style={{ marginLeft: '5.3%', marginRight: '1%', marginTop: '1rem' }}>
        {userrole === 1 ? (
          <>
            <div style={{ marginBottom: '2rem', marginTop: '11.5rem' }}>
              <div className="print_all_today">
                <div
                  onClick={() => handleOpen5()}
                  className="print_all_today_iner"
                >
                  <p>Print All</p>
                  <img src={Print} alt="dd" style={{ width: '25px' }} />
                </div>
              </div>
              <Donation setopendashboard={setopendashboard} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <ManualDonation setopendashboard={setopendashboard} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <OnlineDonation setopendashboard={setopendashboard} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <RoomBooking setopendashboard={setopendashboard} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <OnlineRoomBooking setopendashboard={setopendashboard} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <GuestInRoom setopendashboard={setopendashboard} />
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '2rem', marginTop: '11.5rem' }}>
              <div className="print_all_today">
                <div
                  onClick={() => handleOpen5()}
                  className="print_all_today_iner"
                >
                  <p>Print All</p>
                  <img src={Print} alt="dd" style={{ width: '25px' }} />
                </div>
              </div>
              <EmployeeElectronic setopendashboard={setopendashboard} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <EmployeeManualDonation setopendashboard={setopendashboard} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <EmployeeRoombooking setopendashboard={setopendashboard} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <EmployeeGuestInRoom setopendashboard={setopendashboard} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashbordTap;
