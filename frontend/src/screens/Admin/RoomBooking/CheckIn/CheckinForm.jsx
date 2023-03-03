import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '280px',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
    borderRadius: 6,
    width: '100%',
    fontSize: 15,
    padding: 8,
    paddingLeft: 12,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const statelist = [
  { id: 1, state: 'Andhra Pradesh' },
  { id: 2, state: 'Arunachal Pradesh' },
  { id: 3, state: 'Assam' },
  { id: 4, state: 'Bihar' },
  { id: 5, state: 'Chhattisgarh' },
  { id: 6, state: 'Goa' },
  { id: 7, state: 'Gujarat' },
  { id: 8, state: 'Haryana' },
  { id: 9, state: 'Himachal Pradesh' },
  { id: 10, state: 'Jammu and Kashmir' },
  { id: 11, state: 'Jharkhand' },
  { id: 12, state: 'Karnataka' },
  { id: 13, state: 'Kerala' },
  { id: 14, state: 'Madhya Pradesh' },
  { id: 15, state: 'Maharashtra' },
  { id: 16, state: 'Manipur' },
  { id: 17, state: 'Meghalaya' },
  { id: 18, state: 'Mizoram' },
  { id: 19, state: 'Nagaland' },
  { id: 20, state: 'Odisha' },
  { id: 21, state: 'Punjab' },
  { id: 22, state: 'Rajasthan' },
  { id: 23, state: 'Sikkim' },
  { id: 24, state: 'Tamil Nadu' },
  { id: 25, state: 'Telangana' },
  { id: 26, state: 'Tripura' },
  { id: 27, state: 'Uttar Pradesh' },
  { id: 28, state: 'Uttarakhand' },
  { id: 29, state: 'West Bengal' },
];

const idproff = [
  { id: 1, doc: 'Voter ID' },
  { id: 2, doc: 'Driving Licence' },
  { id: 3, doc: 'Aadhar Card' },
  { id: 4, doc: 'PAN Card' },
  { id: 5, doc: 'Other' },
];

function CheckinForm({ setOpen }) {
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="main_div_checkin_div">
            <p>Details</p>
            <div>
              <div className="date_and_time_div">
                <div className="inpur_div_room">
                  <label>Date</label>
                  <CustomInput
                    style={{ width: '95%' }}
                    type="date"
                    required
                    id="advncerate"
                    name="advncerate"
                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>

                <div className="inpur_div_room">
                  <label>Time</label>
                  <CustomInput
                    style={{ width: '95%', marginLeft: '5%' }}
                    id="advncerate"
                    type="time"
                    required
                    name="advncerate"
                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear">
                  <label>Full Name</label>
                  <CustomInput
                    id="advncerate"
                    type="text"
                    name="advncerate"
                    required

                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Email</label>
                  <CustomInput
                    id="advncerate"
                    type="text"
                    name="advncerate"
                    required

                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Mobile Number</label>
                  <CustomInput
                    id="advncerate"
                    type="text"
                    name="advncerate"
                    required

                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear_adddress">
                  <label>Full Name</label>
                  <input type="text" />
                </div>

                <div className="date_and_time_div_add">
                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label>City</label>
                    <input type="text" />
                  </div>

                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label>State</label>
                    <select>
                      {statelist &&
                        statelist.map((item) => {
                          return (
                            <option
                              // sx={{
                              //   fontSize: 14,
                              // }}
                              key={item.id}
                              value={item.state}
                            >
                              {item.state}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="inpur_div_room_add">
                    <label>Pincode</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="minddle_div_room">
                <div className="minddle_div_room_innear">
                  <label>Id Proof</label>
                  <Select
                    id="categroyname"
                    required
                    sx={{
                      width: '280px',
                      fontSize: 14,
                      '& .MuiSelect-select': {
                        // borderColor: !!formerror.donationtype ? 'red' : '',
                        padding: '10px 0px 10px 10px',
                        background: '#fff',
                      },
                    }}
                    // value={categroyname}
                    // name="categroyname"
                    // onChange={(e) => setcategroyname(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={''}
                    >
                      Please select
                    </MenuItem>
                    {idproff &&
                      idproff.map((item) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.id}
                            value={item.doc}
                          >
                            {item.doc}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
                <div className="minddle_div_room_innear">
                  <label>Id Proof Number</label>
                  <CustomInput
                    id="advncerate"
                    type="text"
                    name="advncerate"
                    required

                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Stay Days</label>
                  <CustomInput
                    id="advncerate"
                    type="text"
                    name="advncerate"
                    required

                    // placeholder="Enter the rate"
                    // value={advncerate}
                    // onChange={(e) => setadvncerate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="main_div_checkin_div1">
            <p>Member Details</p>
            <div className="main_Btotn_check_div">
              <div className="main_ddsh_div">
                <div className="main_Btotn_check_div_input">
                  <label>Male</label>
                  <input type="text" />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label>Female</label>
                  <input type="text" />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label>Children</label>
                  <input type="text" />
                </div>
              </div>
              <div>
                <div className="number_inera_div">
                  <label>Total Member</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="save-div-btn">
            <button className="save-div-btn-btn">Save</button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckinForm;
