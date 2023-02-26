import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f4.png';
import { NavLink, useNavigate } from 'react-router-dom';
const DonationReportTap = ({ setopendashboard }) => {
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
              to="/admin-panel/electronic/report/cash"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cash Report
            </NavLink>
            <NavLink
              to="/admin-panel/electronic/report/elec"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Electronic Report
            </NavLink>
            <NavLink
              to="/admin-panel/electronic/report/cheque"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cheque Report
            </NavLink>
            <NavLink
              to="/admin-panel/electronic/report/item"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Item Report
            </NavLink>
            <NavLink
              to="/admin-panel/electronic/report/headreport"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Head Report
            </NavLink>
            <NavLink
              to="/admin-panel/electronic/report/consolidated"
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

          {/* <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <ManualCash setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <Electornic setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <ManualCheque setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <Itemdonation setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 5 ? 'content  active-content' : 'content'
              }
            >
              <HeadReport setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 6 ? 'content  active-content' : 'content'
              }
            >
              <Consolidated setopendashboard={setopendashboard} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DonationReportTap;
