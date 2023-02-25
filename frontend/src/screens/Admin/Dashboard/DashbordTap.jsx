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
const DashbordTap = ({ setopendashboard }) => {
  const [userrole, setuserrole] = useState('');
  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <div style={{ marginLeft: '5.3%', marginRight: '1%', marginTop: '1rem' }}>
        {userrole === 1 ? (
          <>
            <div style={{ marginBottom: '2rem', marginTop: '11.5rem' }}>
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
