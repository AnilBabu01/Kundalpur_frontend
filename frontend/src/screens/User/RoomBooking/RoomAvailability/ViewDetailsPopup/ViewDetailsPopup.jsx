import React, { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dharam3 from '../../../../../assets/dharam3.jpeg';
import dharam1 from '../../../../../assets/dharam1.jpeg';
import dharam2 from '../../../../../assets/dharam2.jpeg';
import './ViewDetailsPopup.css';
const ViewDetailsPopup = ({ handleClose }) => {
  const [showimg, setshowimg] = useState(dharam1);
  const imgData = [
    { id: 1, img: dharam1 },
    { id: 2, img: dharam2 },
    { id: 3, img: dharam3 },
  ];
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h2>Room Details</h2>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <div className="main_div_view_details">
        <div className="main_div_view_details_innear1">
          <img src={showimg} alt="showimg" />
          <div className="main_set_img_div">
            {imgData &&
              imgData.map((item) => {
                return (
                  <img
                    onClick={() => setshowimg(item.img)}
                    key={item.id}
                    src={item.img}
                    style={{ width: '25%', height: '100px' }}
                  />
                );
              })}
          </div>
        </div>
        <div className="main_div_view_details_innear">
          <p>
            Dharmshala :
            <span className="main_div_view_details_gray">
              Lala umrav singh jain
            </span>
          </p>
          <p>
            Room Type :
            <span className="main_div_view_details_gray"> AC room</span>
          </p>
          <p>
            Room price :<spna className="main_div_view_details_gray">1250</spna>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPopup;
