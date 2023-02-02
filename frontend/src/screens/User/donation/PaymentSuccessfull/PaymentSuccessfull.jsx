import React, { useEffect } from 'react';
import images from '../../../../assets/images.png';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccessfull.css';
function PaymentSuccessfull({ isData }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <div className="PaymentSuccessfull-main-div">
        <div className="PaymentSuccessfull-main-div-innear">
          <img src={images} alt=" images " />
          <p>Payment successful</p>
          <button
            onClick={() => {
              navigate('/reciept', {
                state: {
                  userdata: isData,
                },
              });
            }}
            className="done-btn"
          >
            Download Receipt
          </button>
          <button
            onClick={() => navigate('/donationhistory')}
            className="done-btn"
          >
            Go To Donation History
          </button>
          <button
            onClick={() => {
              navigate('/donation');
            }}
            className="ok_btn"
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessfull;
