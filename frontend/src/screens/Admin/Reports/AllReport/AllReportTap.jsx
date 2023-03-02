import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f4.png';
import { NavLink } from 'react-router-dom';
const AllReportTap = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              style={{ width: '20rem' }}
              to="/admin-panel/allreport/allhead"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Head Report(Electornic)
            </NavLink>
            <NavLink
              style={{ width: '20rem' }}
              to="/admin-panel/allreport/allconsolidated"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Consolidated(Electornic)
            </NavLink>
            <NavLink
              style={{ width: '20rem' }}
              to="/admin-panel/allreport/allhead"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Head Report(Manual)
            </NavLink>
            <NavLink
              style={{ width: '20rem' }}
              to="/admin-panel/allreport/allconsolidated"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Consolidated(Manual)
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReportTap;
