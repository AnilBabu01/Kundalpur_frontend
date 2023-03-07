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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem' }}>Change Room</h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <CheckAvalability
                facility={facility}
                Dharamshala={Dharamshala}
                setOpen1={setOpen1}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="main_div_checkin_div">
            <p>Details</p>
            <div>
              <div className="date_and_time_div">
                <div className="inpur_div_room">
                  <label htmlFor="date">Date</label>
                  <CustomInput
                    style={{ width: '80%' }}
                    type="date"
                    required
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                  />
                </div>

                <div className="inpur_div_room">
                  <label htmlFor="time">Time</label>
                  <CustomInput
                    style={{ width: '95%' }}
                    id="time"
                    type="time"
                    required
                    name="time"
                    value={time}
                    onChange={(e) => settime(e.target.value)}
                  />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear">
                  <label htmlFor="phoneno">Mobile Number</label>
                  <CustomInput
                    id="phoneno"
                    type="text"
                    name="phoneno"
                    required
                    placeholder="Enter the mobile number"
                    value={phoneno}
                    onChange={(e) => setphoneno(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label htmlFor="email">Father's Name</label>
                  <CustomInput
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter the Father's Name"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label htmlFor="fullname">Full Name</label>
                  <CustomInput
                    id="fullname"
                    type="text"
                    name="fullname"
                    required
                    placeholder="Enter the full name"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                  />
                </div>
              </div>

              <div className="minddle_div_room">
                <div className="minddle_div_room_innear_adddress">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="Enter the Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>

                <div className="date_and_time_div_add">
                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>

                  <div
                    className="inpur_div_room_add"
                    style={{ marginRight: '1.1rem' }}
                  >
                    <label>State</label>
                    <select
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    >
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
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      placeholder="pincode"
                      value={pincode}
                      onChange={(e) => setpincode(e.target.value)}
                    />
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
                    value={idproffname}
                    name="idproffname"
                    onChange={(e) => setidproffname(e.target.value)}
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
                  <label htmlFor="idproffno">Id Proof Number</label>
                  <CustomInput
                    id="idproffno"
                    type="text"
                    name="idproffno"
                    required
                    placeholder="Enter the idproff no"
                    value={idproffno}
                    onChange={(e) => setidproffno(e.target.value)}
                  />
                </div>
                <div className="minddle_div_room_innear">
                  <label>Stay Days</label>
                  <CustomInput
                    id="staydays"
                    type="text"
                    name="staydays"
                    required
                    placeholder="Enter the stay days"
                    value={staydays}
                    onChange={(e) => setstaydays(e.target.value)}
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
                  <label htmlFor='"maleno'>Male</label>
                  <input
                    id="maleno"
                    type="text"
                    name="maleno"
                    required
                    placeholder="Male member "
                    value={maleno}
                    onChange={(e) => {
                      setmaleno(e.target.value);
                    }}
                  />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label htmlFor="femaleno">Female</label>
                  <input
                    id="femaleno"
                    type="text"
                    name="femaleno"
                    required
                    placeholder="Female member"
                    value={femaleno}
                    onChange={(e) => setfemaleno(e.target.value)}
                  />
                </div>
                <div className="main_Btotn_check_div_input">
                  <label htmlFor="Children">Children</label>
                  <input
                    id="Children"
                    type="text"
                    name="Children"
                    required
                    placeholder="Children member"
                    value={Children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="number_inera_div">
                  <label htmlFor="TotalMember">Total Member</label>
                  <input
                    id="TotalMember"
                    type="text"
                    name="TotalMember"
                    required
                    placeholder="Total members"
                    value={TotalMember}
                    onChange={(e) => setTotalMember(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="save-div-btn">
            <button onClick={() => handleOepn1()} className="save-div-btn-btn">
              Next
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

export default RoomShiftForm;
