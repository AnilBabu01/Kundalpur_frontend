import React, { useEffect, useState } from 'react';
import DashbordTap from './DashbordTap';
import CardAmount from './CardAmount/CardAmount';
import Group224 from '../../../assets/Group224.png';
import Group225 from '../../../assets/Group225.png';
import Group227 from '../../../assets/Group227.png';
import Group228 from '../../../assets/Group228.png';
import './Dashboard.css';

const Dashboard = ({ setopendashboard }) => {
  const [userrole, setuserrole] = useState('');
  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', paddingTop: '0.5rem' }}>
        <div
          className="dashboarddiv"
          style={{
            marginLeft: '5.3%',
            marginRight: '1%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {userrole === 1 ? (
            <>
              <div
                className="main_card_amount"
                style={{ background: '#48a828', color: 'white' }}
              >
                <p>Donation</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#e96d00', color: 'white' }}
              >
                <p>Manual Donation</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#1C82AD', color: 'white' }}
              >
                <p>Online Donation</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group224} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#1C53BC', color: 'white' }}
              >
                <p>Room Booking</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group227} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#9F2B68', color: 'white' }}
              >
                <p>Online Room Booking</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#808080', color: 'white' }}
              >
                <p>Guest in Room</p>
                <div className="main_repue_img">
                  <p>10,000</p>
                  <img src={Group228} alt="dd" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="main_card_amount"
                style={{ background: '#48a828', color: 'white' }}
              >
                <p>Donation</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#e96d00', color: 'white' }}
              >
                <p>Manual Donation</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>

              <div
                className="main_card_amount"
                style={{ background: '#1C82AD', color: 'white' }}
              >
                <p>Room Booking</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group227} alt="dd" />
                </div>
              </div>

              <div
                className="main_card_amount"
                style={{ background: '#808080', color: 'white' }}
              >
                <p>Guest in Room</p>
                <div className="main_repue_img">
                  <p>10,000</p>
                  <img src={Group228} alt="dd" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <DashbordTap setopendashboard={setopendashboard} />
    </>
  );
};

export default Dashboard;
