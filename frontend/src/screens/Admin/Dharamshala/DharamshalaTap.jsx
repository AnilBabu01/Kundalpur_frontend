import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f1.png';
import AddDharamshala from './AddDharamshala/AddDharamshala';
import AddCategory from './AddCategory/AddCategory';
import AddFacilities from './AddFacilities/AddFacilities';
import AddRoom from './AddRoom/AddRoom';
const DharamshalaTap = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth , dashboarmain">
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
              Dharamshala
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
              Facilities
            </button>
            <button
              className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(2)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Category
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
              Room
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <AddDharamshala setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <AddCategory setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <AddFacilities setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <AddRoom setopendashboard={setopendashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DharamshalaTap;
