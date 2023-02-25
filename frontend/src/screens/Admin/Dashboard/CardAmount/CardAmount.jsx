import React from 'react';
import './CardAmount.css';
function CardAmount({ item }) {
  return (
    <>
      <div className="main_card_amount">
        <p>{item.title}</p>
        <div className="main_repue_img">
          <p>₹ 10,000</p>
          {item.img}
        </div>
      </div>
    </>
  );
}

export default CardAmount;
