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

  const data = [
    {
      id: 1,
      title: 'Donation',
      img: <img src={Group225} alt="dd" />,
    },
    {
      id: 2,
      title: 'Manual Donation',
      img: <img src={Group225} alt="dd" />,
    },
    {
      id: 3,
      title: 'Online Donation',
      img: <img src={Group224} alt="dd" />,
    },
    {
      id: 4,
      title: 'Room Booking',
      img: <img src={Group227} alt="dd" />,
    },
    {
      id: 5,
      title: 'Online Room Booking',
      img: <img src={Group227} alt="dd" />,
    },
    {
      id: 6,
      title: 'Guest in Room',
      img: <img src={Group228} alt="dd" />,
    },
  ];

  const data1 = [
    {
      id: 1,
      title: 'Donation',
      img: <img src={Group225} alt="dd" />,
    },
    {
      id: 2,
      title: 'Manual Donation',
      img: <img src={Group225} alt="dd" />,
    },

    {
      id: 3,
      title: 'Room Booking',
      img: <img src={Group227} alt="dd" />,
    },

    {
      id: 3,
      title: 'Guest in Room',
      img: <img src={Group228} alt="dd" />,
    },
  ];
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
              {data.map((item) => {
                return <CardAmount key={item.id} item={item} />;
              })}
            </>
          ) : (
            <>
              {data1.map((item) => {
                return <CardAmount key={item.id} item={item} />;
              })}
            </>
          )}
        </div>
      </div>

      <DashbordTap setopendashboard={setopendashboard} />
    </>
  );
};

export default Dashboard;
