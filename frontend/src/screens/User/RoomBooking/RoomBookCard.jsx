import React from 'react';
import dharam1 from '../../../assets/dharam1.jpeg';
import dharam2 from '../../../assets/dharam2.jpeg';
function RoomBookCard() {
  return (
    <>
      <div className="card_dharamShala">
        <img src={dharam1} alt="img" />
        <div className="conent_btn_div">
          <p>LALA UMRAV SINGH JAIN DHARMSHALAs</p>
          <button>Details</button>
        </div>
      </div>
    </>
  );
}

export default RoomBookCard;
