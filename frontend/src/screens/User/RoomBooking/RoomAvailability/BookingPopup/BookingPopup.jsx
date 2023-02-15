import { Box } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import {
  CustomInput1,
  CustomInput2,
  CustomInputLabel,
  CustomTableInput,
} from '../../../../Admin/Donation/Donation/common/index';

import './BookingPopup.css';
const BookingPopup = ({ handleClose }) => {
  return (
    <div>
      <div className="addscrollbar_div_lala1">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>Accommodation Details</h2>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <div>
          <div className="previous_detalts_div">
            <div className="previous_detalts_div_innear">
              <p>Dharamshala : Vardhman Dharamshala </p>
            </div>
            <div className="previous_detalts_div_innear">
              <p>Room Type : AC Room Check in date </p>
              <p>9/02/2023 6:00pm</p>
            </div>
            <div className="previous_detalts_div_innear">
              <p>Daily Rent : ₹1250</p>
              <p>Duration : 2 days</p>
            </div>
            <div className="previous_detalts_div_innear1">
              <p>Check out date : 11/02/2023 8:00pm</p>
              <p>Total Rent : ₹2500</p>
            </div>
          </div>
          <div className="mian_input_div_flex">
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">Full Name</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">Email</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">
                Mobile number
              </CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
          </div>
          <div className="mian_input_div_flex">
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">Address</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">City</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">State</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
          </div>
          <div className="mian_input_div_flex">
            <div>
              <CustomInputLabel htmlFor="receiptNo">ID Proof</CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </div>
            <div className="cennn_form">
              <div className="gendr_innear_div">
                <label htmlFor="receiptNo">Male</label>
                <CustomInput2
                  sx={{
                    width: '50%',
                    fontSize: 14,
                    // '& .MuiSelect-select': {
                    //   padding: '1px',
                    // },
                  }}
                  type="text"
                  // id="receiptNo"
                  // value={receiptNo}
                  // onChange={(event) => {
                  //   setReceiptNo(event.target.value);
                  // }}
                />
              </div>
              <div className="gendr_innear_div">
                <label htmlFor="receiptNo">Female</label>
                <CustomInput2
                  sx={{
                    width: '50%',
                    fontSize: 14,
                    // '& .MuiSelect-select': {
                    //   padding: '1px',
                    // },
                  }}
                  type="text"
                  // id="receiptNo"
                  // value={receiptNo}
                  // onChange={(event) => {
                  //   setReceiptNo(event.target.value);
                  // }}
                />
              </div>
              <div className="gendr_innear_div">
                <label htmlFor="receiptNo">Children</label>
                <CustomInput2
                  sx={{
                    width: '50%',
                    fontSize: 14,
                    // '& .MuiSelect-select': {
                    //   padding: '1px',
                    // },
                  }}
                  type="text"
                  // id="receiptNo"
                  // value={receiptNo}
                  // onChange={(event) => {
                  //   setReceiptNo(event.target.value);
                  // }}
                />
              </div>
            </div>
            <div>
              <CustomInputLabel htmlFor="receiptNo">
                Total Member
              </CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </div>
          </div>
          <div className="mian_input_div_flex1">
            <Grid item xs={6} md={4}>
              <CustomInputLabel htmlFor="receiptNo">
                No of room
              </CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
            <Grid item xs={6} md={4} className="add_left_margins">
              <CustomInputLabel htmlFor="receiptNo">
                Room price
              </CustomInputLabel>
              <CustomInput1
                type="text"
                // id="receiptNo"
                // value={receiptNo}
                // onChange={(event) => {
                //   setReceiptNo(event.target.value);
                // }}
              />
            </Grid>
          </div>

          <div className="proces_btn_main_div">
            <div>
              <button className="Proceed_btn">Proceed To Check</button>
              <button
                onClick={() => {
                  handleClose();
                }}
                className="Proceed_btn_go"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
