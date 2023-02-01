import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentStatusPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function PaymentStatusPage({ setHeaderFooter, setpaymentId }) {
  const [transactionID, setTransactionID] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  console.log(location, 'this is location');
  useEffect(() => {
    setHeaderFooter(true);
  }, []);

  useEffect(() => {
    if (search) {
      let value = new URLSearchParams(search).get('t');
      setTransactionID(value);
      setpaymentId(value);
    } else {
      setTransactionID(false);
    }
  }, [search]);
  return (
    <div className="payment-status-page">
      <div className="payment-status-container">
        {transactionID ? (
          <CheckCircleIcon className="icon-success icon" />
        ) : (
          <ErrorIcon className="icon-failed icon" />
        )}
        <h2
          className={
            transactionID
              ? 'payment-status'
              : 'payment-status payment-status-failed'
          }
        >
          {transactionID ? 'Payment Success!!' : 'Payment Failed'}
        </h2>
        {transactionID ? (
          <p className="payment-description">
            Thank you for your purchase. Your transaction has been completed
            with transaction ID: {transactionID}.{' '}
          </p>
        ) : (
          <p className="payment-description">
            Your payment is failed.Don't worry if its deducted from you bank
            account then it will refund soon. You can donate again by{' '}
            <span onClick={() => navigate('/')}>clicking here</span>
          </p>
        )}
      </div>
    </div>
  );
}
