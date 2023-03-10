import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ok from '../../../../assets/ok.png';
import './PaymentSuccess.css';
function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <>
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
              <p>UPI</p>
              <p>HDFC</p>
              <p>3625362532</p>
              <p>anilb@gmail.com</p>
              <p>2300.00</p>
              <p>125362547859</p>
            </div>
          </div>
          <div className="payment_btn_duvvvvvv">
            <button className="payment_btn_duvvvvvv10">Confirmation</button>
            <button className="payment_btn_duvvvvvv11">Booking history</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
