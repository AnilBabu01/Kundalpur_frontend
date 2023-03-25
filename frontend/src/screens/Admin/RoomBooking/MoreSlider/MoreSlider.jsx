import React, { useState, useEffect } from 'react';
import DharamshalaCard from '../AllAcards/DharamshalaCard';
import { serverInstance } from '../../../../API/ServerInstance';
import 'react-multi-carousel/lib/styles.css';
import './MoreSlider.css';

function MoreSlider() {
  const [dharamshalalist, setdharamshalalist] = useState('');
  const getALLdharamshala = () => {
    serverInstance('room/dharmashala', 'get').then((res) => {
      console.log('dharanmjhfkjhd', res.data);
      setdharamshalalist(res.data);
    });
  };
  useEffect(() => {
    getALLdharamshala();
  }, []);
  return (
    <>
      <div className="sjilder_main_div">
        <div className="view_all_main_div">
          <p>Other Dharmshala</p>
          <button> View all</button>
        </div>
        <div className="center_wrap_hai_na">
          {dharamshalalist &&
            dharamshalalist.map((item, index) => {
              return <DharamshalaCard data={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default MoreSlider;
