import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import f1 from '../../../../assets/f4.png';
const ManualDonationTap = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/manual/report/cash"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Cash Report
            </NavLink>
            <NavLink
              style={{ width: '17%' }}
              to="/admin-panel/manual/report/elec"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '0%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Electronic Report
            </NavLink>
            <NavLink
              to="/admin-panel/manual/report/cheque"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Cheque Report
            </NavLink>
            <NavLink
              to="/admin-panel/manual/report/item"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Item Report
            </NavLink>
            <NavLink
              to="/admin-panel/manual/report/headreport"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Head Report
            </NavLink>
            <NavLink
              to="/admin-panel/manual/report/consolidated"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Consolidated
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualDonationTap;
