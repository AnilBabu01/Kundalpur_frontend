import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import homee from '../../../../assets/homee.jpeg';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import room1 from '../../../../assets/room1.jpeg';
import room2 from '../../../../assets/room2.jpeg';
import room3 from '../../../../assets/room3.jpeg';
import room4 from '../../../../assets/room4.jpeg';
import RoomCard from '../AllAcards/RoomCard';
import { serverInstance } from '../../../../API/ServerInstance';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { MenuItem, Menu, Select } from '@mui/material';
import { backendUrl } from '../../../../config/config';
import MoreSlider from '../MoreSlider/MoreSlider';
import { useLocation } from 'react-router-dom';
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
  width: '167px',
  height: '26px',
  paddingLeft: '0.5rem',
  background: 'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    borderRadius: 6,
    width: '167px',
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
const Kundalpurtype = [
  { id: 1, type: 'Dharamshala' },
  { id: 2, type: 'Hotel' },
];

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
import './DharamDetails.css';
function DharamDetails({ setopendashboard }) {
  const location = useLocation();
  let { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isData, setisData] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('Select');
  const [chlidremc, setchlidremc] = useState(0);
  const [abcount, setabcount] = useState(0);
  const [roomcount, setroomcount] = useState(0);
  const [detailsofroons, setdetailsofroons] = useState('');
  const getALLdharamshala = () => {
    serverInstance(`room/dharmashala?id=${id}`, 'get').then((res) => {
      console.log('dharsmshala detisls', res.data);
      setdetailsofroons(res.data);
    });
  };
  useEffect(() => {
    getALLdharamshala();
    if (location.state) {
      setisData(location.state?.checkindata);
    }
    setopendashboard(true);
  }, [id]);
  console.log('child count from details screens', isData);
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
      <div
        style={{ marginLeft: '5rem', marginRight: '1.2rem', marginTop: '4rem' }}
      >
        <div className="backebj_voucher">
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        {/* <div className="main_div_head_tyopeeee">
          <div className="form_div_absolute10">
            <form className="form_btn_div">
              <div className="main_div_select_div">
                <label>
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
                  {Dharamshalalist &&
                    Dharamshalalist.map((item, idx) => {
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
              <div className="main_div_select_div">
                <label>
                  <img
                    style={{ width: '8%', marginRight: '1%' }}
                    src={homee}
                    alt="dd"
                  />
                  Check In
                </label>
                <CustomInput
                  id="name"
                  name="name"
                  placeholder="Full name"
                  type="datetime-local"
                  // onChange={onChange}
                  // value={
                  //   donationdata.selected === 'yes1' && user.name
                  //     ? user.name
                  //     : donationdata.name
                  // }
                />
              </div>
              <div className="main_div_select_div">
                <label>
                  <img
                    style={{ width: '8%', marginRight: '1%' }}
                    src={homee}
                    alt="dd"
                  />
                  Check Out
                </label>
                <CustomInput
                  id="name"
                  name="name"
                  placeholder="Full name"
                  type="datetime-local"
                  // onChange={onChange}
                  // value={
                  //   donationdata.selected === 'yes1' && user.name
                  //     ? user.name
                  //     : donationdata.name
                  // }
                />
              </div>
              <div className="main_div_select_div">
                <label>
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
        </div> */}

        <div className="details-div_dhar" style={{ marginTop: '1rem' }}>
          <img
            src={`${backendUrl}uploads/images/${
              detailsofroons.dharmasala && detailsofroons.dharmasala?.image1
            }`}
            alt=" dharam1"
          />
          <div className="right_div_deta_dhram">
            <h2>{detailsofroons?.name}</h2>
            <h2 className="main_text_deltails">Description</h2>
            <p>{detailsofroons?.desc}</p>
            <div className="dharamshal_arc_main_name_div10">
              <img src={homee} alt="dd" />
              <p>Kundalpur</p>
            </div>
          </div>
        </div>

        <div className="details-div_dhar">
          {detailsofroons.availableRooms && (
            <>
              <RoomCard
                image={detailsofroons.availableRooms[0].image1}
                data={detailsofroons.availableRooms[0]}
              />
              <RoomCard
                image={detailsofroons.availableRooms[0].image2}
                data={detailsofroons.availableRooms[0]}
              />
              <RoomCard
                image={detailsofroons.availableRooms[0].image3}
                data={detailsofroons.availableRooms[0]}
              />
              <RoomCard
                image={detailsofroons.availableRooms[0].image4}
                data={detailsofroons.availableRooms[0]}
              />
            </>
          )}
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
                . Passport, Aadhar, Driving License and Govt. ID are accepted as
                ID proof(s)
              </p>
              <p>. Property staff is trained on hygiene guidelines</p>
            </div>
          </div>
        </div>

        <MoreSlider />
      </div>
    </>
  );
}

export default DharamDetails;
