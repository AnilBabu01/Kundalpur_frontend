import React, { useState, useEffect } from 'react';
import Online from './Online/Online';
import Cheque from './Cheque/Cheque';
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
      <div className="mobilewidth">
        <div className="container1">
          <div className="bloc-tabsonline">
            <button
              style={{ marginRight: '3rem' }}
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              {/* <img className="fasti" src={fastimg} alt="fast" /> */}
              Online Donation Report
            </button>
            <button
              className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(2)}
            >
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
