import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ReactTransliterate } from 'react-transliterate';
import Swal from 'sweetalert2';
import axios from 'axios';

const custominput = {
  width: '100%',
  height: '33px',
  borderRadius: '5px',
  paddingLeft: '0.5rem',
};
function UpdateDonationType({ data, handleClose3 }) {
  const location = useLocation();

  console.log('data', data);

  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState('');
  const [donationtype_in_eng, setdonationtype_in_eng] = useState('');
  const [text, settext] = useState('');
  const [id, setid] = useState('');
  console.log('aaa', data.type_en);
  const handlesubmit = async () => {
    try {
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.put(`${backendApiUrl}admin/donation-type`, {
        id: id,
        modeOfType: 2,
        type_en: donationtype_in_eng,
        type_hi: donationtype_in_hindi,
      });
      console.log(res);
      if (res.data.status === true) {
        Swal.fire('Great!', 'User Added Successfully', 'success');

        handleClose3();
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      handleClose3();
    }
  };

  useEffect(() => {
    if (data) {
      setisData(data?.data);
      setdonationtype_in_eng(data.itemType_en);
      setdonationtype_in_hindi(data.itemType_hi);
      setid(data.id);
    }
  }, []);
  return (
    <>
      <div className="main_uodate_div">
        <div className="update-form">
          <div className="main-input-di">
            <div className="inner-input-div-donations">
              <label htmlFor="donationtype_in_hindi">
                Enter donation type in hindi 
              </label>
              <ReactTransliterate
                style={custominput}
                id="full-name"
                required
                value={donationtype_in_hindi}
                onChangeText={(donationtype_in_hindi) => {
                  setdonationtype_in_hindi(donationtype_in_hindi);
                }}
                onChange={(e) => setdonationtype_in_hindi(e.target.value)}
                lang="hi"
              />
              <label htmlFor="donationtype_in_eng">
                Enter donation type in english 
              </label>
              <input
                style={custominput}
                type="text"
                id="donationtype_in_eng"
                value={donationtype_in_eng}
                name="donationtype_in_eng"
                onChange={(e) => setdonationtype_in_eng(e.target.value)}
              />
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-btn1">
              Update{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDonationType;
