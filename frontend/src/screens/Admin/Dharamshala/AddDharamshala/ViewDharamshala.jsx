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
  const [nameinHindi, setnameinHindi] = useState('');
  const [nameinEnglish, setnameinEnglish] = useState('');
  const [img1, setimg1] = useState('');
  const [img2, setimg2] = useState('');
  const [img3, setimg3] = useState('');
  const [img4, setimg4] = useState('');
  const [img5, setimg5] = useState('');
  const [img6, setimg6] = useState('');
  const [img7, setimg7] = useState('');
  const [img8, setimg8] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');
  const [previewprofile2, setpreviewprofile2] = useState('');
  const [previewprofile3, setpreviewprofile3] = useState('');
  const [previewprofile4, setpreviewprofile4] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      formData.set('name', nameinEnglish);
      formData.set('nameH', nameinHindi);
      formData.set('image1', img5);
      formData.set('image2', img6);
      formData.set('image3', img7);
      formData.set('image4', img8);
      formData.set('id', updatedata?.id);
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(
        `${backendApiUrl}room/dharmashala`,

        formData,
      );

      console.log(res.data);
      if (res.data.status) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    if (updatedata) {
      setnameinEnglish(updatedata?.name);
      setnameinHindi(updatedata?.nameH);
      setimg1(updatedata?.image1);
      setimg2(updatedata?.image2);
      setimg3(updatedata?.image3);
      setimg4(updatedata?.image4);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div>
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <p htmlFor="fromNo">dharamshala in english</p>
                  <p htmlFor="fromNo">{nameinEnglish}</p>
                </div>

                <div
                  className="inner-input-div2"
                  style={{ marginLeft: '4.5rem' }}
                >
                  <p htmlFor="toNo">dharamshala in hindi</p>
                  <p htmlFor="toNo">{nameinHindi}</p>
                </div>
              </div>
            </div>
            <div className="main_upload_sharam">
              <div className="cemera_inear_div">
                <img
                  style={{
                    width: '278px',
                    height: '98px',
                    borderRadius: '5px',
                  }}
                  src={
                    previewprofile1
                      ? previewprofile1
                      : img1
                      ? `${backendUrl}uploads/images/${img1}`
                      : camera
                  }
                  alt="ss"
                />
              </div>
              <div className="cemera_inear_div">
                <img
                  style={{
                    width: '278px',
                    height: '98px',
                    borderRadius: '5px',
                  }}
                  src={
                    previewprofile2
                      ? previewprofile2
                      : img2
                      ? `${backendUrl}uploads/images/${img2}`
                      : camera
                  }
                  alt="ss"
                />
              </div>
            </div>

            <div className="main_upload_sharam">
              <div className="cemera_inear_div">
                <img
                  style={{
                    width: '278px',
                    height: '98px',
                    borderRadius: '5px',
                  }}
                  src={
                    previewprofile3
                      ? previewprofile3
                      : img3
                      ? `${backendUrl}uploads/images/${img3}`
                      : camera
                  }
                  alt="ss"
                />
              </div>
              <div className="cemera_inear_div">
                <img
                  style={{
                    width: '278px',
                    height: '98px',
                    borderRadius: '5px',
                  }}
                  src={
                    previewprofile4
                      ? previewprofile4
                      : img4
                      ? `${backendUrl}uploads/images/${img4}`
                      : camera
                  }
                  alt="ss"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDharamshala;
