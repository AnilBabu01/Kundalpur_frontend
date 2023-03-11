import React, { useState } from 'react';
import camera from '../../../../assets/camera.png';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
const formData = new FormData();
const custumstyle = {
  width: '280px',
  height: '35px',
  background: '#FFFFFF',
  border: '1px solid #C5BFBF',
  borderRadius: '7px',
  paddingLeft: '0.5rem',
};

function AddForm({ setOpen }) {
  const [nameinHindi, setnameinHindi] = useState('');
  const [nameinEnglish, setnameinEnglish] = useState('');
  const [description, setdescription] = useState('');
  const [isonline, setisonline] = useState(true);
  const [isoffline, setisoffline] = useState(true);
  const [img1, setimg1] = useState('');
  const [img2, setimg2] = useState('');
  const [img3, setimg3] = useState('');
  const [img4, setimg4] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');
  const [previewprofile2, setpreviewprofile2] = useState('');
  const [previewprofile3, setpreviewprofile3] = useState('');
  const [previewprofile4, setpreviewprofile4] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      formData.set('name', nameinEnglish);
      formData.set('nameH', nameinHindi);
      formData.set('image1', img1);
      formData.set('image2', img2);
      formData.set('image3', img3);
      formData.set('image4', img4);
      formData.set('desc', description);
      formData.set('isOffline', isoffline);
      formData.set('isOnline', isonline);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(
        `${backendApiUrl}room/dharmashala`,

        formData,
      );

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <form onSubmit={handlesubmit}>
            <div style={{ marginTop: '0.2rem' }}>
              <label htmlFor="fromNo">Dharanshala Name</label>
              <input
                style={{ width: '100%', marginTop: '0.2rem' }}
                type="textarea"
                id="fromNo"
                placeholder="enter the description"
                className="forminput_add_user10"
                value={description}
                name="description"
                onChange={(e) => setdescription(e.target.value)}
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
                <img src={camera} />
              </div>
            </div>

            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Save'
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="save-div-btn-btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddForm;
