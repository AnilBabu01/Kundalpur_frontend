import React, { useEffect, useState } from 'react';
import DashbordTap from './DashbordTap';
import Group224 from '../../../assets/Group224.png';
import Group225 from '../../../assets/Group225.png';
import Group227 from '../../../assets/Group227.png';
import Group228 from '../../../assets/Group228.png';
import { serverInstance } from '../../../API/ServerInstance';
import DonationTotal from '../TotalDashboardFun/DonationTotal';
import ManaulTotal from '../TotalDashboardFun/ManaulTotal';
import OnlineTotal from '../TotalDashboardFun/OnlineTotal';
import EmpelecTotal from '../TotalDashboardFun/EmpelecTotal';
import EmpmanulTotal from '../TotalDashboardFun/EmpmanulTotal';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [userrole, setuserrole] = useState('');
  const [isData1, setisData1] = useState('');
  const [isData2, setisData2] = useState('');
  const [isData3, setisData3] = useState('');
  const [isData4, setisData4] = useState('');
  const [isData5, setisData5] = useState('');
  const getallelec = () => {
    serverInstance('admin/dash-admin-total-elec', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData1(res.data.data);
    });
  };

  const getallmanual = () => {
    serverInstance('admin/dash-admin-total-manual', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData2(res.data.data);
    });
  };

  const getallonline = () => {
    serverInstance('admin/dash-admin-total-online', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData3(res.data.data);
    });
  };

  const getallempelec = () => {
    serverInstance('admin/dash-employee-total-elec', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData4(res.data.data);
    });
  };

  const getallempmanual = () => {
    serverInstance('admin/dash-employee-total-manual', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData5(res.data.data);
    });
  };

  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
    getallelec(),
      getallmanual(),
      getallonline(),
      getallempelec(),
      getallempmanual();
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
                onClick={() => navigate('/admin-panel/donation')}
                className="main_card_amount"
                style={{ background: '#FE0000', color: 'white' }}
              >
                <p>Donation</p>
                <div className="main_repue_img">
                  <DonationTotal data={isData1} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/manualdonation')}
                className="main_card_amount"
                style={{ background: '#FECE00', color: 'white' }}
              >
                <p>Manual Donation</p>
                <div className="main_repue_img">
                  <ManaulTotal data={isData2} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/online/report/online')}
                className="main_card_amount"
                style={{ background: '#009430', color: 'white' }}
              >
                <p>Online Donation</p>
                <div className="main_repue_img">
                  <OnlineTotal data={isData3} />
                  <img src={Group224} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#3C5FFE', color: 'white' }}
              >
                <p>Room Booking</p>
                <div className="main_repue_img">
                  <p>₹ 10,000</p>
                  <img src={Group227} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#FF6332', color: 'white' }}
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
                onClick={() => navigate('/admin-panel/donation')}
                className="main_card_amount"
                style={{ background: '#FE0000', color: 'white' }}
              >
                <p>Donation</p>
                <div className="main_repue_img">
                  <EmpelecTotal data={isData4} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/manualdonation')}
                className="main_card_amount"
                style={{ background: '#FECE00', color: 'white' }}
              >
                <p>Manual Donation</p>
                <div className="main_repue_img">
                  <EmpmanulTotal data={isData5} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>

              <div
                className="main_card_amount"
                style={{ background: '#3C5FFE', color: 'white' }}
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
