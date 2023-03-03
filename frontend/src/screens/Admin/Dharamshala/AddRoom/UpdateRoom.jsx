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
      borderColor: theme.palette.primary.main,
    },
  },
}));
function UpdateRoom({ setOpen, updatedata }) {
  const [facility, setfacility] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [category, setcategory] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [facilityname, setfacilityname] = useState('');
  const [rate, setrate] = useState('');
  const [advncerate, setadvncerate] = useState('');
  const [checkout, setcheckout] = useState('');
  const [roomno, setroomno] = useState('');
  const [roomtype, setroomtype] = useState(1);
  const [roomstatus, setroomstatus] = useState(true);
  const [categroyname, setcategroyname] = useState('');
  const handlesubmit = async () => {
    try {
      console.log('click');

      const data = {
        RoomNo: roomno,
        Rate: rate,
        dharmasala: dharamshalaname,
        category: categroyname,
        status: roomstatus,
        roomType: roomtype,
        advance: advncerate,
        Facilities: facilityname,
        coTime: checkout,
        id: updatedata?.id,
      };
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room`, data);

      if (res.data.data.status) {
        setOpen(false);

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

  const getallcategory = () => {
    serverInstance('room/category', 'get').then((res) => {
      console.log('category', res.data);
      if (res.data) {
        setcategory(res.data);
      }
    });
  };

  useEffect(() => {
    getalldharamshala();
    getallfacility();
    getallcategory();

    if (updatedata) {
      //   RoomNo: roomno,
      //   Rate: rate,
      //   dharmasala: dharamshalaname,
      //   category: categroyname,
      //   status: roomstatus,
      //   roomType: roomtype,
      //   advance: advncerate,
      //   Facilities: facilityname,
      //   coTime: checkout,

      setroomno(updatedata?.RoomNo);
      setrate(updatedata?.Rate);
      setroomstatus(updatedata?.status);
      setroomtype(updatedata?.roomType);
      setadvncerate(updatedata?.advance);
      setcheckout(updatedata?.coTime);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
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
                  value={dharamshalaname}
                  name="dharamshalaname"
                  onChange={(e) => setdharamshalaname(e.target.value)}
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
                  {Dharamshala &&
                    Dharamshala.map((item) => {
                      return (
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="roomno">
                  Room Number
                </label>
                <CustomInput
                  id="roomno"
                  name="roomno"
                  placeholder="Enter the rate"
                  value={roomno}
                  onChange={(e) => setroomno(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Facilities
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
                  value={facilityname}
                  name="facilityname"
                  onChange={(e) => setfacilityname(e.target.value)}
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
                  {facility &&
                    facility.map((item) => {
                      return (
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categroyname"
                >
                  Category
                </label>
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
                  value={categroyname}
                  name="categroyname"
                  onChange={(e) => setcategroyname(e.target.value)}
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
                  {category &&
                    category.map((item) => {
                      return (
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          key={item.id}
                          value={item.Name}
                        >
                          {item.Name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Rate
                </label>
                <CustomInput
                  id="rate"
                  name="rate"
                  placeholder="Enter the rate"
                  value={rate}
                  onChange={(e) => setrate(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="advncerate">
                  Advance Amount
                </label>
                <CustomInput
                  id="advncerate"
                  name="advncerate"
                  placeholder="Enter the rate"
                  value={advncerate}
                  onChange={(e) => setadvncerate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="checkout">
                  Check Out Time
                </label>
                <CustomInput
                  type="time"
                  id="checkout"
                  name="checkout"
                  placeholder="Enter the rate"
                  value={checkout}
                  onChange={(e) => setcheckout(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="roomtype">
                  Room Type
                </label>
                <Select
                  id="roomtype"
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
                  value={roomtype}
                  name="roomtype"
                  onChange={(e) => setroomtype(e.target.value)}
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
                    value={1}
                  >
                    Yes
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={0}
                  >
                    No
                  </MenuItem>
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="roomstatus">
                  Status
                </label>
                <Select
                  id="roomstatus"
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
                  value={roomstatus}
                  name="roomstatus"
                  onChange={(e) => setroomstatus(e.target.value)}
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
                    Enable
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={false}
                  >
                    Disable
                  </MenuItem>
                </Select>
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

export default UpdateRoom;
