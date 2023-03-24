import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import Moment from 'moment-js';
import moment from 'moment';
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
  const [Dharamshala, setDharamshala] = useState('');
  const [category, setcategory] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [holdername, setholdername] = useState('');
  const [holdermobile, setholdermobile] = useState('');
  const [holdsince, setholdsince] = useState('');
  const [holdremain, setholdremain] = useState('');
  const [holdaprodeBy, setholdaprodeBy] = useState('');
  const [remarks, setremarks] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [showloader, setshowloader] = useState(false);

  var today = new Date(holdremain);
  const remainDate = Moment(today).format('YYYY-DD-MM');
  const remainTime = moment(today, 'HH:mm').format('hh:mm');

  var today1 = new Date(holdsince);
  const sinceDate = Moment(today1).format('YYYY-DD-MM');
  const sinceTime = moment(today1, 'HH:mm').format('hh:mm');
  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const data = {
        name: holdername,
        mobile: holdermobile,
        since: sinceDate,
        sinceTime: sinceTime,
        remainTime: remainTime,
        remain: remainDate,
        dharmasala: dharamshalaname,
        category: categoryname,
        roomNo: '2',
        approvedBy: holdaprodeBy,
        remarks: remarks,
      };

      const res = await axios.post(`${backendApiUrl}room/hold`, data);

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
      console.log('dharmshala', res.data);
      if (res.data) {
        setDharamshala(res.data);
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

  const checkavailability = async () => {
    serverInstance(
      `room/check-room-catg?hotelName=${dharamshalaname}&category=${categoryname}`,
      'get',
    ).then((res) => {
      console.log('category', res);
      // if (res.data) {
      //   setcategory(res.data);
      // }
    });
  };

  useEffect(() => {
    getalldharamshala();
    getallcategory();
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
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
                  {Dharamshala
                    ? Dharamshala.map((item, index) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item?.dharmasala_id}
                            value={item?.dharmasala_id}
                          >
                            {item?.name}
                          </MenuItem>
                        );
                      })
                    : ''}
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
                  value={categoryname}
                  name="categoryname"
                  onChange={(e) => setcategoryname(e.target.value)}
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
                          key={item?.category_id}
                          value={item?.category_id}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  &nbsp;
                </label>
                <button
                  onClick={() => checkavailability()}
                  className="check_babbs_btn"
                >
                  {' '}
                  Check Availability
                </button>
              </div>
            </div>
          </div>
          <div className="tablescrollbarss">
            <table className="table_ddd">
              <tbody>
                <tr>
                  <td className="table_tddd">Booked</td>
                  <td className="table_tddd">Room No</td>
                  <td className="table_tddd">Room Rent</td>
                  <td className="table_tddd">Advance Deposit</td>
                  <td className="table_tddd">Dharamshala</td>
                  <td className="table_tddd">Category</td>
                  <td className="table_tddd">Facility</td>
                  <td className="table_tddd">Time</td>
                </tr>
                <tr>
                  <td className="table_tddd">
                    <input type="checkbox" />
                  </td>
                  <td className="table_tddd">16</td>
                  <td className="table_tddd">250.00</td>
                  <td className="table_tddd">600.00</td>
                  <td className="table_tddd">SADLAGA (सदलगा)</td>
                  <td className="table_tddd">Single room</td>
                  <td className="table_tddd">AC</td>
                  <td className="table_tddd">Auto</td>
                </tr>
                <tr>
                  <td className="table_tddd">
                    <input type="checkbox" />
                  </td>
                  <td className="table_tddd">16</td>
                  <td className="table_tddd">250.00</td>
                  <td className="table_tddd">600.00</td>
                  <td className="table_tddd">SADLAGA (सदलगा)</td>
                  <td className="table_tddd">Single room</td>
                  <td className="table_tddd">AC</td>
                  <td className="table_tddd">Auto</td>
                </tr>
                <tr>
                  <td className="table_tddd">
                    <input type="checkbox" />
                  </td>
                  <td className="table_tddd">16</td>
                  <td className="table_tddd">250.00</td>
                  <td className="table_tddd">600.00</td>
                  <td className="table_tddd">SADLAGA (सदलगा)</td>
                  <td className="table_tddd">Single room</td>
                  <td className="table_tddd">AC</td>
                  <td className="table_tddd">Auto</td>
                </tr>
                <tr>
                  <td className="table_tddd">
                    <input type="checkbox" />
                  </td>
                  <td className="table_tddd">16</td>
                  <td className="table_tddd">250.00</td>
                  <td className="table_tddd">600.00</td>
                  <td className="table_tddd">SADLAGA (सदलगा)</td>
                  <td className="table_tddd">Single room</td>
                  <td className="table_tddd">AC</td>
                  <td className="table_tddd">Auto</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="holdername">
                  Room holder Name
                </label>
                <CustomInput
                  id="holdername"
                  name="holdername"
                  placeholder="Enter Room holder Name"
                  value={holdername}
                  onChange={(e) => setholdername(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="holdermobile"
                >
                  Holder Mobile No.
                </label>
                <CustomInput
                  id="holdermobile"
                  name="holdermobile"
                  placeholder="Enter  Holder Mobile No."
                  value={holdermobile}
                  onChange={(e) => setholdermobile(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="holdsince">
                  Hold Since
                </label>
                <CustomInput
                  type="datetime-local"
                  id="holdsince"
                  name="holdsince"
                  placeholder="Enter  Hold Since"
                  value={holdsince}
                  onChange={(e) => setholdsince(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="holdremain">
                  Hold Remain
                </label>
                <CustomInput
                  id="address"
                  name="holdremain"
                  type="datetime-local"
                  placeholder="Hold Remain"
                  value={holdremain}
                  onChange={(e) => setholdremain(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="holdaprodeBy"
                >
                  Hold Approved By
                </label>
                <CustomInput
                  id="holdaprodeBy"
                  name="holdaprodeBy"
                  type="text"
                  placeholder="Hold Approved By"
                  value={holdaprodeBy}
                  onChange={(e) => setholdaprodeBy(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="remarks">
                  Remarks
                </label>
                <CustomInput
                  id="remarks"
                  name="remarks"
                  type="text"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
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
