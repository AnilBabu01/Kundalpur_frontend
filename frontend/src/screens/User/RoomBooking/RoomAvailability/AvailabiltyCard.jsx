import React from 'react';
import dharam1 from '../../../../assets/dharam1.jpeg';

function AvailabiltyCard() {
  return (
    <>
      <div className="room_book_card_main">
        <div className="room_book_card_main_content">
          <div className="img_div_room_card">
            <img src={dharam1} alt="aa" />
            <div className="img_div_room_card_price_div">
              <p>A.C. Room ₹ 1250.00</p>
              <p>Available Rooms : 14</p>
            </div>
          </div>
          <div className="btn_Book_Now_main">
            <button className="btn_Book_Now">Book Now</button>
            <button className="btn_View_Details">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabiltyCard;
