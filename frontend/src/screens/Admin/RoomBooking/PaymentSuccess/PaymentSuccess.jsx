import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ok from '../../../../assets/ok.png';
import { serverInstance } from '../../../../API/ServerInstance';
import './PaymentSuccess.css';
function PaymentSuccess({ setopendashboard }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [isData, setisData] = useState('');
  const [paymentmode, setpaymentmode] = useState('');
  useEffect(() => {
    if (location.state) {
      serverInstance(
        `room/checkin-id?id=${location.state?.data.data.id}`,
        'get',
      ).then((res) => {
        setisData(res.data);
      });

      setpaymentmode(location.state?.Paymode);
    }
    setopendashboard(true);
  }, []);
  console.log('Payment details', isData);
  return (
    <>
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
        <div className="main_div_head_tyopeeeebook">
          <div className="form_div_absolutebook_payment">
            <div className="centerdivhh">
              <p> Payment successful</p>
              <img src={ok} alt="ss" />
            </div>
            <div className="name_of_divvsssssv">
              <div className="name_of_divvsssssv10">
                <p>Payment type</p>
                <p>Bank</p>
                <p> Mobile number</p>
                <p>Email</p>
                <p>Amount Paid</p>
                <p>Transaction id</p>
              </div>
              <div className="name_of_divvsssssv10">
                <p>{paymentmode}</p>
                <p>HDFC</p>
                <p>3625362532</p>
                <p>anilb@gmail.com</p>
                <p>2300.00</p>
                <p>125362547859</p>
              </div>
            </div>
            <div className="payment_btn_duvvvvvv">
              <button
                onClick={() =>
                  navigate('/admin-panel/room/roombookingcetificate', {
                    state: {
                      data: isData,
                    },
                  })
                }
                className="payment_btn_duvvvvvv10"
              >
                Confirmation
              </button>
              <button className="payment_btn_duvvvvvv11">Booking report</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
