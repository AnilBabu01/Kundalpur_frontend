import React, { useEffect } from 'react';
import DashbordTap from './DashbordTap';
import './Dashboard.css';

const Dashboard = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <DashbordTap setopendashboard={setopendashboard} />
    </>
  );
};

export default Dashboard;
