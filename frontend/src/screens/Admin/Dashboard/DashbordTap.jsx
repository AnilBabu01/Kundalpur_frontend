import React, { useState, useEffect } from 'react';
import Donation from './Donation/Donation';
import ManualDonation from './Donation/ManualDonation';
import OnlineDonation from './Donation/OnlineDonation';
import RoomBooking from './RoomBooking/RoomBooking';
import OnlineRoomBooking from './RoomBooking/OnlineRoomBooking';
import GuestInRoom from './RoomBooking/GuestInRoom';
const DashbordTap = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div
        className="dashboarddiv"
        style={{ marginLeft: '5.3%', marginRight: '1%' }}
      >
        <div style={{ marginBottom: '2rem' }}>
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
      </div>
    </>
  );
};

export default DashbordTap;
