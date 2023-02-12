import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardWrapper from '../sitebar/DashboardWrapper';
const MainAdmin = ({ setopendashboard }) => {
  const { pathname } = useLocation();

  console.log(pathname, 'this is header');

  return (
    <>
      <DashboardWrapper />
    </>
  );
};

export default MainAdmin;
