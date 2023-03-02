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
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="fromNo">Online</label>
                  <select
                    onChange={(e) => setisonline(e.target.value)}
                    className="forminput_add_user"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="inner-input-div2">
                  <label htmlFor="fromNo">Offline</label>
                  <select
                    onClick={(e) => setisoffline(e.target.value)}
                    className="forminput_add_user"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="inner-input-div2">
                  <label htmlFor="fromNo">dharamshala in english</label>
                  <input
                    type="text"
                    id="fromNo"
                    placeholder="enter the dharamshala name in english"
                    style={custumstyle}
                    value={nameinEnglish}
                    name="nameinEnglish"
                    onChange={(e) => setnameinEnglish(e.target.value)}
                  />
                </div>
                <div className="inner-input-div2">
                  <label htmlFor="toNo">dharamshala in hindi</label>

                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    placeholder="enter the dharamshala name in hindi"
                    value={nameinHindi}
                    onChangeText={(nameinHindi) => {
                      setnameinHindi(nameinHindi);
                    }}
                    onChange={(e) => setnameinHindi(e.target.value)}
                    lang="hi"
                  />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              <label htmlFor="fromNo">Discription</label>
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <div className="form-div">
                <div className="form-input-div_add_user">
                  <div className="main_upload_sharam">
                    <div className="cemera_inear_div">
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '5px',
                        }}
                        src={previewprofile1 ? previewprofile1 : camera}
                        alt="ss"
                      />
                    </div>
                    <div className="selctimg_div">
                      <label htmlFor="img1">Image 1 </label>
                      <input
                        style={{ marginRight: '2rem' }}
                        id="img1"
                        className="forminput_add_user10"
                        type="file"
                        placeholder="enter category name"
                        name="img1"
                        onChange={(e) => {
                          setimg1(e.target.files[0]);

                          setpreviewprofile1(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="main_upload_sharam">
                    <div className="cemera_inear_div">
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '5px',
                        }}
                        src={previewprofile2 ? previewprofile2 : camera}
                        alt="ss"
                      />
                    </div>
                    <div className="selctimg_div">
                      <label htmlFor="img2">Image 2 </label>
                      <input
                        id="img2"
                        className="forminput_add_user10"
                        type="file"
                        placeholder="enter category name"
                        name="img2"
                        onChange={(e) => {
                          setimg2(e.target.files[0]);

                          setpreviewprofile2(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-div">
                <div className="form-input-div_add_user">
                  <div className="main_upload_sharam">
                    <div className="cemera_inear_div">
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '5px',
                        }}
                        src={previewprofile3 ? previewprofile3 : camera}
                        alt="ss"
                      />
                    </div>
                    <div className="selctimg_div">
                      <label htmlFor="img3">Image 3 </label>
                      <input
                        style={{ marginRight: '2rem' }}
                        id="img3"
                        className="forminput_add_user10"
                        type="file"
                        placeholder="enter category name"
                        name="img3"
                        onChange={(e) => {
                          setimg3(e.target.files[0]);

                          setpreviewprofile3(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="main_upload_sharam">
                    <div className="cemera_inear_div">
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '5px',
                        }}
                        src={previewprofile4 ? previewprofile4 : camera}
                        alt="ss"
                      />
                    </div>
                    <div className="selctimg_div">
                      <label htmlFor="img4">Image 4 </label>
                      <input
                        id="img4"
                        className="forminput_add_user10"
                        type="file"
                        placeholder="enter category name"
                        name="img4"
                        onChange={(e) => {
                          setimg4(e.target.files[0]);

                          setpreviewprofile4(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
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
