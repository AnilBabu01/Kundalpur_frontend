import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import homee from '../../../assets/homee.jpeg';
import DharamshalaCard from './AllAcards/DharamshalaCard';
import ServicesandFacilities from './Services&Facilities/ServicesandFacilities';
import { serverInstance } from '../../../API/ServerInstance';
import Moment from 'moment-js';
import moment from 'moment';
import { MenuItem, Menu, Select } from '@mui/material';
import { backendApiUrl, backendUrl } from '../../../config/config';
import RoomCard1 from '../roombookings/AllAcards/RoomCard1';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import axios from 'axios';
import './RoomBooking.css';
import { width } from '@mui/system';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};
export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  height: '26px',
  paddingLeft: '0.5rem',
  background: 'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    borderRadius: 6,
    width: '100%',
    height: '26px',
    fontSize: 15,

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

const Dharamshalalist = [
  { id: 1, type: 'Lala Umrav Singh Jain' },
  { id: 2, type: 'Vardhman Dharmshala' },
  { id: 3, type: 'North wing (Katla Parisar)' },
];
const roomCount = [
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];
const AdultsAount = [
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const Childrencont = [
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];
function RoomBooking({ setroomfilterdata }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showresuilt, setshowresuilt] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [filterdata, setfilterdata] = useState('');
  const [dharamshalalist, setdharamshalalist] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('Select');
  const [chlidremc, setchlidremc] = useState(0);
  const [abcount, setabcount] = useState(0);
  const [roomcount, setroomcount] = useState(0);
  const [checkouttime, setcheckouttime] = useState('');
  const [checkintime, setcheckintime] = useState('');

  var today = new Date(checkouttime);
  const checkoutcurrDate = Moment(today).format('YYYY-MM-DD');
  const checkoutcurrTime = moment(today, 'HH:mm').format('hh:mm');

  var today1 = new Date(checkintime);
  const checkincurrDate = Moment(today1).format('YYYY-MM-DD');
  const checkincurrTime = moment(today1, 'HH:mm').format('hh:mm');

  console.log('check out time', checkoutcurrDate, checkoutcurrTime);
  console.log('check out time', checkincurrDate, checkincurrTime);
  console.log('dharamshala name ', dharamshalaname);

  const handleClieck = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!checkintime || !checkouttime || !dharamshalaname) {
      setIsLoading(false);
      return;
    }
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const data = {
      hotelName: dharamshalaname,
      checkinDate: checkincurrDate,
      checkinTime: checkincurrTime,
      checkoutDate: checkoutcurrDate,
      checkoutTime: checkoutcurrTime,
      numAdults: abcount,
      numChildren: chlidremc,
    };
    const res = await axios.post(`${backendApiUrl}room/check-room`, data);
    if (res.data.data) {
      setfilterdata(res.data.data);
      setshowresuilt(true);
      setIsLoading(false);
    }
  };

  const getALLdharamshala = () => {
    setIsLoading(true);
    serverInstance('room/dharmashala', 'get').then((res) => {
      if (res.data) {
        setIsLoading(false);
        setdharamshalalist(res.data);
      }
    });
  };
  useEffect(() => {
    getALLdharamshala();
  }, []);
  const data = {
    dharamshalaname: dharamshalaname,
    chlidremc: chlidremc,
    roomcount: roomcount,
    abcount: abcount,
    checkoutcurrDate: checkoutcurrDate,
    checkoutcurrTime: checkoutcurrTime,
    checkincurrDate: checkincurrDate,
    checkincurrTime: checkincurrTime,
    checkintime: checkintime,
    checkouttime: checkouttime,
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <div className="main_slelct_child">
            Rooms
            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={roomcount}
              onChange={(e) => setroomcount(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>

              {roomCount &&
                roomCount.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      key={item.id}
                      value={item.type}
                    >
                      {item.type}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="main_slelct_child">
            <div>
              Adults
              <p style={{ color: ' #6C6A6A', fontSize: '12px' }}>
                (Above 12 Years)
              </p>
            </div>

            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={abcount}
              onChange={(e) => setabcount(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>
              {AdultsAount &&
                AdultsAount.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      key={item.id}
                      value={item.type}
                    >
                      {item.type}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="main_slelct_child">
            <div>
              Children{' '}
              <p style={{ color: ' #6C6A6A', fontSize: '12px' }}>
                (Age 12 years & below){' '}
              </p>
            </div>
            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={chlidremc}
              onChange={(e) => setchlidremc(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>
              {Childrencont &&
                Childrencont.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
                      }}
                      key={item.id}
                      value={item.type}
                    >
                      {item.type}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
        </MenuItem>
      </Menu>

      <div className="main_room_availabilty">
        <div className="room_home_main_supper">
          <div className="room_home_main">
            <div className="room_home_main_overlay">
              <div>
                <h2 className="font_text_color">
                  Fresh, quiet and <br /> peaceful Kundalpur Dharamshala &
                  Hotels
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="form_div_absolute">
          <form onSubmit={handleClieck} className="form_btn_div">
            <div className="main_div_select_div">
              <label className="labbelddd">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Kundalpur
              </label>
              <Select
                required
                sx={{
                  width: '100%',
                  height: '26px',
                  paddingLeft: '0.5rem',

                  background:
                    'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={dharamshalaname}
                onChange={(e) => setdharamshalaname(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 12,
                  }}
                  value="Select"
                >
                  Select
                </MenuItem>
                {dharamshalalist &&
                  dharamshalalist.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 12,
                        }}
                        key={item.dharmasala_id}
                        value={item.dharmasala_id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="main_div_select_div">
              <label className="labbelddd" htmlFor="checkintime">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Check In
              </label>
              <CustomInput
                id="checkintime"
                name="checkintime"
                placeholder="Full name"
                type="datetime-local"
                onChange={(e) => setcheckintime(e.target.value)}
                value={checkintime}
              />
            </div>
            <div className="main_div_select_div">
              <label className="labbelddd" htmlFor="checkouttime">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Check Out
              </label>
              <CustomInput
                id="checkouttime"
                name="checkouttime"
                placeholder="Full name"
                type="datetime-local"
                onChange={(e) => setcheckouttime(e.target.value)}
                value={checkouttime}
              />
            </div>
            <div className="main_div_select_div">
              <label className="labbelddd">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Rooms For
              </label>

              <div onClick={handleClick} className="select_person_div">
                Select
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="#333333"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <button>
              <SearchIcon />
              Search
            </button>
          </form>
        </div>
      </div>

      {filterdata.length > 0 ? (
        <>
          <div className="details-div_dhar">
            <img
              src={`${backendUrl}uploads/images/${
                filterdata &&
                filterdata[0].dharmasala &&
                filterdata[0].dharmasala?.image
              }`}
              alt=" dharam1"
            />
            <div className="right_div_deta_dhram">
              <h2>
                {filterdata &&
                  filterdata[0].dharmasala &&
                  filterdata[0].dharmasala?.name}
              </h2>
              <h2 className="main_text_deltails">Description</h2>
              <p>
                {filterdata &&
                  filterdata[0].dharmasala &&
                  filterdata[0].dharmasala?.desc}
              </p>
              <div className="dharamshal_arc_main_name_div10">
                <img src={homee} alt="dd" />
                <p>Kundalpur</p>
              </div>
            </div>
          </div>

          <div className="details-div_dhar">
            {filterdata &&
              filterdata.map((item) => {
                return <RoomCard1 data={item} isData={data} />;
              })}
          </div>

          <div className="imp_info_super_div">
            <div className="imp_info">
              <div className="imp_info_ine_p">
                <p> Important information</p>
              </div>
              <div className="imp_info_ine_innear_div_p">
                <p>. Guests with fever are not allowed</p>
                <p>
                  . Office ID and Non-Govt IDs are not accepted as ID proof(s)
                  Passport
                </p>
                <p>
                  . Passport, Aadhar, Driving License and Govt. ID are accepted
                  as ID proof(s)
                </p>
                <p>. Property staff is trained on hygiene guidelines</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sjilder_main_div">
            <div className="view_all_main_div">
              <p>Kundalpur Dharamshala</p>
              <button> View all</button>
            </div>
            <div className="center_wrap_hai_na">
              {dharamshalalist &&
                dharamshalalist.map((item, index) => {
                  return <DharamshalaCard data={item} data1={data} />;
                })}
            </div>
          </div>
        </>
      )}
      {isLoading ? <LoadingSpinner /> : <></>}
      <ServicesandFacilities />
    </>
  );
}

export default RoomBooking;
