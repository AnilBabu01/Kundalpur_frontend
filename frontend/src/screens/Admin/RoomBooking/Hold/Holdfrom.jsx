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
import './Holdform.css';
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
function Holdfrom({ setOpen }) {
  const [facility, setfacility] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [facilityname, setfacilityname] = useState('');
  const [isonline, setisonline] = useState(true);
  const [isoffline, setisoffline] = useState(true);
  const [rate, setrate] = useState('');
  const [advncerate, setadvncerate] = useState('');
  const [categoryname, setcategoryname] = useState('');

  const [checkout, setcheckout] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async () => {
    try {
      setshowloader(true);

      const data = {
        dharmasala: dharamshalaname,
        Name: categoryname,
        Rate: rate,
        Facilities: facilityname,
        advance: advncerate,
        isOffline: isoffline,
        isOnline: isonline,
        checkoutTime: checkout,
      };
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/category`, data);

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  const getalldharamshala = () => {
    serverInstance('room/dharmashala', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  const getallfacility = () => {
    serverInstance('room/facility', 'get').then((res) => {
      if (res.data) {
        setfacility(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    getalldharamshala();
    getallfacility();
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Room holder Name
                </label>
                <CustomInput
                  id="categoryname"
                  name="categoryname"
                  placeholder="Enter Room holder Name"
                  value={categoryname}
                  onChange={(e) => setcategoryname(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Holder Mobile No.
                </label>
                <CustomInput
                  id="categoryname"
                  name="categoryname"
                  placeholder="Enter  Holder Mobile No."
                  value={categoryname}
                  onChange={(e) => setcategoryname(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categoryname"
                >
                  Hold Since
                </label>
                <CustomInput
                  id="categoryname"
                  name="categoryname"
                  placeholder="Enter  Hold Since"
                  value={categoryname}
                  onChange={(e) => setcategoryname(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="rate">
                  Dharamshala
                </label>
                <Select
                  id="donation-type"
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
                  value={isoffline}
                  name="isoffline"
                  onChange={(e) => setisoffline(e.target.value)}
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
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={true}
                  >
                    Please select
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={false}
                  >
                    No
                  </MenuItem>
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="advncerate">
                  Category
                </label>
                <Select
                  id="donation-type"
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
                  value={isoffline}
                  name="isoffline"
                  onChange={(e) => setisoffline(e.target.value)}
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
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={true}
                  >
                    Please select
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={false}
                  >
                    No
                  </MenuItem>
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  &nbsp;
                </label>
                <button className="check_babbs_btn"> Check Availability</button>
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Hold Remain
                </label>
                <CustomInput
                  id="address"
                  name="checkout"
                  type="text"
                  placeholder="   Hold Remain"
                  value={checkout}
                  onChange={(e) => setcheckout(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="checkout">
                  Hold Approved By
                </label>
                <CustomInput
                  id="address"
                  name="checkout"
                  type="text"
                  placeholder="Hold Approved By"
                  value={checkout}
                  onChange={(e) => setcheckout(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="checkout">
                  Remarks
                </label>
                <CustomInput
                  id="address"
                  name="checkout"
                  type="text"
                  placeholder="Remarks"
                  value={checkout}
                  onChange={(e) => setcheckout(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
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

export default Holdfrom;
