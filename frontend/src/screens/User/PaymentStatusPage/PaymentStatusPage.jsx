import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentStatusPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Modal from '@mui/material/Modal';
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
        setisData(res.donation.pop());
        if (isData) {
        }
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
          {transactionID ? (
            <p className="payment-description">
              Thank you for your purchase. Your transaction has been completed
              with transaction ID: {transactionID}.{' '}
            </p>
          ) : (
            <p className="payment-description">
              Your payment is failed.Don't worry if its deducted from you bank
              account then it will refund soon. You can donate again by{' '}
              <span onClick={() => navigate('/donation')}>clicking here</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
