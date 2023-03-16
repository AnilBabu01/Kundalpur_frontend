import React, { useState, useEffect } from 'react';
import camera from '../../../../assets/camera.png';
import Swal from 'sweetalert2';
import { backendApiUrl, backendUrl } from '../../../../config/config';

import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
const formData = new FormData();
const custumstyle = {
  width: '280px',
  height: '35px',
  background: '#FFFFFF',
  border: '1px solid #C5BFBF',
  borderRadius: '7px',
  paddingLeft: '0.5rem',
};
function ViewDharamshala({ setOpen, updatedata }) {
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [description, setdescription] = useState('');
  const [img1, setimg1] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [showimg, setshowimg] = useState('');

  useEffect(() => {
    if (updatedata) {
      setimg1(updatedata?.image1);
      setdescription(updatedata?.desc);
      setdharamshalaname(updatedata?.name);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div style={{ marginTop: '0.2rem' }}>
            <label htmlFor="dharamshalaname">Dharanshala Name</label>
            <input
              style={{ width: '100%', marginTop: '0.2rem' }}
              type="textarea"
              id="dharamshalaname"
              placeholder="enter the description"
              className="forminput_add_user10"
              value={dharamshalaname}
              name="dharamshalaname"
              onChange={(e) => setdharamshalaname(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '1.2rem' }}>
            <label htmlFor="fromNo">Dharamshala Description</label>
            <textarea
              style={{ width: '99.8%', marginTop: '0.2rem', height: '100px' }}
              id="fromNo"
              placeholder="enter the description"
              className="forminput_add_user10"
              value={description}
              name="description"
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <div className="main_img_divvvv">
              <img
                className="dharamshala_imgggg"
                src={
                  previewprofile1
                    ? previewprofile1
                    : img1
                    ? `${backendUrl}uploads/images/${img1}`
                    : camera
                }
              />
            </div>

            <div className="formdivvv_imf">
              <input
                type="file"
                onChange={(e) => {
                  setimg1(e.target.files[0]);
                  console.log(e.target.files[0]);
                  setpreviewprofile1(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDharamshala;
