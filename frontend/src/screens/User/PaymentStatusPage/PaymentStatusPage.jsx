import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentStatusPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';
import Fade from '@mui/material/Fade';
import { serverInstance } from '../../../API/ServerInstance';
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import PaymentSuccessfull from '../donation/PaymentSuccessfull/PaymentSuccessfull';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '12px',
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 2,
};
export default function PaymentStatusPage({ setHeaderFooter, setpaymentId }) {
  const [transactionID, setTransactionID] = useState(false);
  const [donationDeatils, setDonationDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderFooter(true);
  }, []);

  const get_all_donatiin = () => {
    serverInstance('user/donation-list', 'get').then((res) => {
      if (res.status === 404) {
        Swal.fire('Error!', 'please authenticate', 'error');
        return false;
      }
      try {
        setDonationDetails(res.donation[0]);
        console.log(res.donation[0], res, 'this i');
      } catch (error) {
        Swal.fire('Error!', 'please authenticate', 'error');
      }
    });
  };

  useEffect(() => {
    if (search) {
      let value = new URLSearchParams(search).get('t');
      if (value) {
        setTransactionID(value);
        setpaymentId(value);
        get_all_donatiin();
        handleOpen();
      }
    } else {
      setTransactionID(false);
    }
  }, [search]);
  return (
    <>
      {' '}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <PaymentSuccessfull handleClose={handleClose} isData={isData} />
          </Box>
        </Fade>
      </Modal>
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
          {donationDeatils && <h3>Donated ₹{donationDeatils.AMOUNT}</h3>}
          {transactionID ? (
            <p className="payment-description">
              Thank you for your donation. Your transaction has been completed
              with{' '}
              {donationDeatils && `Order Number: ${donationDeatils.RECEIPT_NO}`}
              <br />
            </p>
          ) : (
            <p className="payment-description">
              Your payment is failed.Don't worry if its deducted from you bank
              account then it will refund soon. You can donate again by{' '}
              <span onClick={() => navigate('/donation')}>clicking here</span>
            </p>
          )}
          <div className="btns-wrapper">
            <button
              className="btn-donation-status"
              onClick={() => navigate('/reciept')}
            >
              Download Receipt
            </button>
            <button
              className="btn-donation-status"
              onClick={() => navigate('/donationhistory')}
            >
              Donation History
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
