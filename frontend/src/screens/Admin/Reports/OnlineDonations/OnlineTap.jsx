import React, { useState, useEffect } from 'react';
import Online from './Online/Online';
import Cheque from './Cheque/Cheque';
import f1 from '../../../../assets/f4.png';
import './OnlineTap.css';
const OnlineTap = ({ setopendashboard }) => {
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
          <div className="bloc-tabsonline">
            <button
              style={{ marginRight: '3rem', width: '17%' }}
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Donation Report
            </button>
            <button
              style={{ width: '17%' }}
              className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(2)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cheque Donation Report
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <Online setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <Cheque setopendashboard={setopendashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineTap;
