import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
function UpdateDonationType({ data, handleClose3 }) {
  const [showloader, setshowloader] = useState(false);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState('');
  const [donationtype_in_eng, setdonationtype_in_eng] = useState('');
  const [id, setid] = useState('');
  console.log('aaa', data.type_en);
  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.put(`${backendApiUrl}admin/donation-type`, {
        id: id,
        modeOfType: 1,
        type_en: donationtype_in_eng,
        type_hi: donationtype_in_hindi,
      });
      console.log(res);
      if (res.data.status === true) {
        setshowloader(false);
        Swal.fire('Great!', 'Donation Type Updated Successfully', 'success');

        handleClose3();
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      handleClose3();
    }
  };

  useEffect(() => {
    if (data) {
      setdonationtype_in_eng(data.type_en);
      setdonationtype_in_hindi(data.type_hi);
      setid(data.id);
    }
  }, []);
  return (
    <>
      <div className="main_uodate_div">
        <div className="update-form">
          <div className="main_add_Head_hai_na">
            <div className="inner-input-div1">
              <label htmlFor="donationtype_in_hindi">
                Enter donation item in hindi 
              </label>

              <ReactTransliterate
                // style={custumstyle}
                id="full-name"
                required
                value={donationtype_in_hindi}
                onChangeText={(donationtype_in_hindi) => {
                  setdonationtype_in_hindi(donationtype_in_hindi);
                }}
                onChange={(e) => setdonationtype_in_hindi(e.target.value)}
                lang="hi"
              />
            </div>
            <div className="inner-input-div1">
              <label htmlFor="donationtype_in_eng">
                Enter donation item in english 
              </label>
              <input
                className="inner-input-div120"
                type="text"
                required
                id="donationtype_in_eng"
                value={donationtype_in_eng}
                name="donationtype_in_eng"
                onChange={(e) => setdonationtype_in_eng(e.target.value)}
              />
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              {showloader ? (
                <CircularProgress
                  style={{
                    width: '21px',
                    height: '21px',
                    color: '#FE7600',
                  }}
                />
              ) : (
                'Add User'
              )}
            </button>
            <button
              onClick={() => handleClose3()}
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

export default UpdateDonationType;
