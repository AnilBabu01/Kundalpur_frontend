import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
const formData = new FormData();
import './Signature.css';
function Signature({ setopendashboard }) {
  const [sign, setsign] = useState('');

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!sign) {
        Swal.fire('Error!', 'please select signature', 'error');
      }
      formData.set('sign', sign);

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.put(
        `${backendApiUrl}admin/signature-upload-emplo`,
        formData,
        config,
      );

      console.log('signature', res.data);
      if (res.data.status) {
        Swal.fire('Great!', res.data.msg, 'success');
        dispatch(loadUser());
      }
    } catch (error) {
      //   Swal.fire('Error!', error.response.data.message, 'error');
    }
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        <form onSubmit={submitHandler}>
          <div className="centerSignatire">
            <div className="input-group-profile">
              <label htmlFor="anniversary_date">Upload Signature</label>
              <input
                type="file"
                name="sign"
                onChange={(e) => {
                  setsign(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
              />
              <button className="btn_signature">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signature;
