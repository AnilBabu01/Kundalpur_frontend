import React, { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dharam3 from '../../../assets/dharam3.jpeg';
import dharam1 from '../../../assets/dharam1.jpeg';
import dharam2 from '../../../assets/dharam2.jpeg';

const RoomPopup = ({ handleClose }) => {
  const [showimg, setshowimg] = useState(dharam1);
  const imgData = [
    { id: 1, img: dharam1 },
    { id: 2, img: dharam2 },
    { id: 3, img: dharam3 },
    { id: 4, img: dharam3 },
  ];
  return (
    <div className="main_div_center_space">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h2> Lala umrav singh jain dharmshala</h2>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <div className="addscrollbar_div_lala">
        <div className="center_jain_div">
          <div className="slide_images_div">
            {imgData &&
              imgData.map((item) => {
                return (
                  <img
                    onClick={() => setshowimg(item.img)}
                    key={item.id}
                    src={item.img}
                    style={{
                      width: '126%',
                      height: '70px',
                      marginBottom: '5px',
                    }}
                  />
                );
              })}
          </div>
          <div className="fix_image_size">
            <img src={showimg} alt="showimg" />
          </div>
        </div>
        <div>
          <p>Description</p>
          <p className="fix_image_size_text">
            Shri Mahaveer Ji has been delightfully decorated to help you feel
            the
            <br />
            warmth of a home in its comfortable atmosphere. Tastefully designed
            <br />
            and elegantly appointed rooms, having their own individual character
            <br />
            and furnishings, embody the finest of Rajasthan, offering high
            levels
            <br />
            of comfort coupled with our personalized services. Welcome aboard to
            <br />
            the exotic attraction of a heritage Rajasthan while enjoying luxury
            of
            <br />
            modern amenities. Shri Mahaveer Ji offers a wide range of
            personalized
            <br />
            services and facilities to help make your stay in Rajasthan, India a
            <br />
            memorable one.
          </p>
        </div>
        <div>
          <p className="fix_image_size_text_room">Rooms Types</p>
        </div>
        <p className="fix_image_size_text">A.C Room First Floor</p>
        <div className="fix_image_size_text_center_div">
          {imgData &&
            imgData.map((item) => {
              return (
                <img
                  onClick={() => setshowimg(item.img)}
                  key={item.id}
                  src={item.img}
                  style={{
                    width: '20%',
                    height: '70px',
                    marginBottom: '5px',
                  }}
                />
              );
            })}
        </div>
        <p className="fix_image_size_text">A.C Room First Floor</p>
        <div className="fix_image_size_text_center_div">
          {imgData &&
            imgData.map((item) => {
              return (
                <img
                  onClick={() => setshowimg(item.img)}
                  key={item.id}
                  src={item.img}
                  style={{
                    width: '20%',
                    height: '70px',
                    marginBottom: '5px',
                  }}
                />
              );
            })}
        </div>
        <p className="fix_image_size_text">A.C Room First Floor</p>
        <div className="fix_image_size_text_center_div">
          {imgData &&
            imgData.map((item) => {
              return (
                <img
                  onClick={() => setshowimg(item.img)}
                  key={item.id}
                  src={item.img}
                  style={{
                    width: '20%',
                    height: '70px',
                    marginBottom: '5px',
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RoomPopup;
