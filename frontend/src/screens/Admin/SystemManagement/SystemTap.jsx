import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f3.png';
import { NavLink, useNavigate } from 'react-router-dom';
const SystemTap = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    setopendashboard(true);
  }, [toggleState]);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/usermanagement"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Add staff
            </NavLink>

            <NavLink
              to="/admin-panel/rolemanagement"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Add role
            </NavLink>
            <NavLink
              to="/admin-panel/vouchermanagement"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Generate voucher
            </NavLink>
            <NavLink
              to="/admin-panel/assign"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Assing voucher
            </NavLink>
          </div>

          {/* <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <UserManagement setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <RoleManagement setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <VoucherManagement setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <Assign setopendashboard={setopendashboard} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SystemTap;
