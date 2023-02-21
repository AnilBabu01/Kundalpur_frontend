import React, { useState, useEffect } from 'react';
import ManualReports from './ManaulReport/ManualReports';
import ManualCash from './ManualCash/ManualCash';
import ManualElectronic from './ManualElectronic/ManualElectronic';
import ManualItem from './ManualItem/ManualItem';
import HeadReport from './HeadReport/HeadReport';
import Consolidated from './Consolidated/Consolidated';
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
            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Cash Report
            </button>
            <button
              style={{ width: '17%' }}
              className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(2)}
            >
              <img
                style={{ marginRight: '0%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Electronic Report
            </button>
            <button
              className={toggleState === 3 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(3)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Cheque Report
            </button>
            <button
              className={toggleState === 4 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(4)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Item Report
            </button>
            <button
              className={toggleState === 5 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(5)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Head Report
            </button>
            <button
              className={toggleState === 6 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(6)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Consolidated
            </button>
          </div>

          <div className="content-tabs">
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
              <ManualElectronic setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <ManualReports setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <ManualItem setopendashboard={setopendashboard} />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualDonationTap;
