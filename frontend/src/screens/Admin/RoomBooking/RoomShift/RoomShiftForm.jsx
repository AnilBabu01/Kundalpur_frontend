import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MenuItem, Select, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CheckAvalability from './CheckAvalability';
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

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

function RoomShiftForm({ setOpen }) {
  const [showchangeroom, setshowchangeroom] = useState(false);
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [idproffname, setidproffname] = useState('');
  const [idproffno, setidproffno] = useState('');
  const [staydays, setstaydays] = useState('');
  const [maleno, setmaleno] = useState('');
  const [femaleno, setfemaleno] = useState('');
  const [Children, setChildren] = useState('');
  const [TotalMember, setTotalMember] = useState();
  const [facility, setfacility] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => setOpen1(true);
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();

  var datee = today.toISOString().substring(0, 10);
  const [date, setdate] = useState(datee);

  const [time, settime] = useState(
    today.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  );

  const handlesubmit = async () => {
    try {
      console.log('click');

      const data = {
        date: date,
        time: time,
        contactNo: phoneno,
        name: fullname,
        // Fname: Fname,
        email: email,
        address: address,
        city: city,
        state: state,
        pin: pincode,
        stayD: staydays,
        proof: idproffname,
        idNumber: idproffno,
        male: maleno,
        female: femaleno,
        child: Children,
        // img: upload,
      };
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/checkin`, data);

      console.log('checkin', res);
      // if (res.data.data.status) {
      //   setOpen(false);

      //   Swal.fire('Great!', res.data.data.message, 'success');
      // }
    } catch (error) {
      // Swal.fire('Error!', error, 'error');
    }
  };
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

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
      {showchangeroom ? (
        <>
          <div className="cash-donation-div">
            <div className="cash-donation-container-innser">
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Dharamshala
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter Room holder Name"
                      // value={categoryname}
                      // onChange={(e) => setcategoryname(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Room No
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter  Holder Mobile No."
                      // value={categoryname}
                      // onChange={(e) => setcategoryname(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Category
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter  Hold Since"
                      // value={categoryname}
                      // onChange={(e) => setcategoryname(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Facility
                    </label>
                    <CustomInput
                      id="address"
                      name="checkout"
                      type="text"
                      placeholder="   Hold Remain"
                      // value={checkout}
                      // onChange={(e) => setcheckout(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="checkout"
                    >
                      Room Rent
                    </label>
                    <CustomInput
                      id="address"
                      name="checkout"
                      type="text"
                      placeholder="Hold Approved By"
                      // value={checkout}
                      // onChange={(e) => setcheckout(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="checkout"
                    >
                      Advance Deposit
                    </label>
                    <CustomInput
                      id="address"
                      name="checkout"
                      type="text"
                      placeholder="Remarks"
                      // value={checkout}
                      // onChange={(e) => setcheckout(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <p>Room Shift to</p>
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
                      // value={isoffline}
                      // name="isoffline"
                      // onChange={(e) => setisoffline(e.target.value)}
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
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="advncerate"
                    >
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
                      // value={isoffline}
                      // name="isoffline"
                      // onChange={(e) => setisoffline(e.target.value)}
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
                    <button className="check_babbs_btn">
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

              <div className="save-div-btn">
                <button
                  onClick={() => handlesubmit()}
                  className="save-div-btn-btn"
                >
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
      ) : (
        <>
          <div className="cash-donation-div">
            <div className="cash-donation-container-innser">
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Booking Id
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'2022-15264253'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Check in Time
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter  Holder Mobile No."
                      value={'31/03/22  13:28 pm'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Mobile number
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter  Hold Since"
                      value={'1253625632'}
                    />
                  </div>
                </div>
              </div>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Name
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'Pranay Shukla'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Email id
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'anil@gmail.com'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Id Proof number
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'15263254789525'}
                    />
                  </div>
                </div>
              </div>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Address
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'pilibhit'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Address
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'up'}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      City
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      value={'Bisalpur'}
                    />
                  </div>
                </div>
              </div>

              <div className="save-div-btn">
                <button
                  style={{ marginRight: '2rem' }}
                  onClick={() => setOpen(false)}
                  className="save-div-btn-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setshowchangeroom(true)}
                  className="save-div-btn-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RoomShiftForm;
